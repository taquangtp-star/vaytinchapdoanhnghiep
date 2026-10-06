import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowDown, Play, Pause } from 'lucide-react';
import { HOTLINE, HOTLINE_TEL } from '../data/loanData';

// 👉 THAY ĐỔI LINK HOẶC ID VIDEO YOUTUBE MẶC ĐỊNH TẠI ĐÂY NẾU MUỐN CỐ ĐỊNH TRONG CODE:
// Hỗ trợ cả link đầy đủ (https://www.youtube.com/shorts/...) hoặc chỉ cần mã ID (11 ký tự)
export const DEFAULT_YOUTUBE_VIDEO = 'W6Gjh0uREw4';

/**
 * Trích xuất YouTube Video ID từ mọi dạng link (Shorts, Watch, YouTu.be, Embed)
 */
export function extractYouTubeId(input: string): string {
  if (!input) return DEFAULT_YOUTUBE_VIDEO;
  const trimmed = input.trim();

  // 1. YouTube Shorts: /shorts/VIDEO_ID
  const shortsMatch = trimmed.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  // 2. youtu.be/VIDEO_ID
  const youtuBeMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuBeMatch) return youtuBeMatch[1];

  // 3. watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // 4. embed/VIDEO_ID
  const embedMatch = trimmed.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // 5. Nếu đã là chuỗi 11 ký tự
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // 6. Fallback tìm chuỗi 11 ký tự hợp lệ
  const any11Match = trimmed.match(/([a-zA-Z0-9_-]{11})/);
  if (any11Match) return any11Match[1];

  return DEFAULT_YOUTUBE_VIDEO;
}

interface TopVerticalVideoProps {
  onRegisterClick?: () => void;
}

export const TopVerticalVideo: React.FC<TopVerticalVideoProps> = ({ onRegisterClick }) => {
  const [videoId, setVideoId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('vpbank_top_video_id');
      if (saved && saved !== '2CsR5JuXR38') {
        return extractYouTubeId(saved);
      }
      return DEFAULT_YOUTUBE_VIDEO;
    } catch {
      return DEFAULT_YOUTUBE_VIDEO;
    }
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showIndicator, setShowIndicator] = useState<boolean>(false);
  const indicatorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Hàm kích hoạt bật âm thanh video
  const unmuteVideo = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    setIsMuted(false);
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'unMute',
        args: [],
      }),
      '*'
    );
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: 'setVolume',
        args: [100],
      }),
      '*'
    );
  };

  // Chạm vào video để tạm dừng hoặc phát tiếp
  const togglePlayPause = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    setShowIndicator(true);

    // Luôn mở âm thanh khi người dùng tương tác
    unmuteVideo();

    if (indicatorTimeoutRef.current) {
      clearTimeout(indicatorTimeoutRef.current);
    }
    indicatorTimeoutRef.current = setTimeout(() => {
      setShowIndicator(false);
    }, 850);

    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: nextState ? 'playVideo' : 'pauseVideo',
        args: [],
      }),
      '*'
    );
  };

  // Lắng nghe trạng thái phát của video YouTube (khi phát hết thì tạm dừng lại)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.event === 'onStateChange') {
          // YT.PlayerState: 0 = ENDED, 1 = PLAYING, 2 = PAUSED
          if (data.info === 0) {
            // Khi video phát hết -> Tự động tạm dừng lại
            setIsPlaying(false);
            if (iframeRef.current && iframeRef.current.contentWindow) {
              iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                  event: 'command',
                  func: 'pauseVideo',
                  args: [],
                }),
                '*'
              );
            }
          } else if (data.info === 1) {
            setIsPlaying(true);
          } else if (data.info === 2) {
            setIsPlaying(false);
          }
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Tự động mở âm thanh video khi tải trang và khi người dùng tương tác
  useEffect(() => {
    const timer = setTimeout(() => {
      unmuteVideo();
    }, 400);

    const onUserInteraction = () => {
      unmuteVideo();
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('pointerdown', onUserInteraction);
    };

    window.addEventListener('click', onUserInteraction, { passive: true });
    window.addEventListener('touchstart', onUserInteraction, { passive: true });
    window.addEventListener('pointerdown', onUserInteraction, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('pointerdown', onUserInteraction);
    };
  }, []);

  // Hỗ trợ cập nhật video linh hoạt qua URL param ?video=... hoặc window.setTopVideo(url)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlVideo = params.get('video');
      if (urlVideo) {
        const id = extractYouTubeId(urlVideo);
        setVideoId(id);
        try {
          localStorage.setItem('vpbank_top_video_id', id);
        } catch {
          // ignore
        }
      }

      (window as unknown as { setTopVideo?: (u: string) => string }).setTopVideo = (u: string) => {
        const id = extractYouTubeId(u);
        setVideoId(id);
        try {
          localStorage.setItem('vpbank_top_video_id', id);
        } catch {
          // ignore
        }
        return `Đã cập nhật video ID: ${id}`;
      };
    }
  }, []);

  return (
    <section className="relative bg-white text-slate-900 pt-0 pb-5 px-0 border-b border-slate-200/80 w-full overflow-hidden">
      {/* Background soft subtle ambient highlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-100/60 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full">
        {/* HIỂN THỊ TRÀN VIỀN 100% FULL CHIỀU NGANG, TỶ LỆ 3/4 VÀ VIỀN MỜ MÀU TRẮNG TINH TẾ */}
        <div className="w-full relative overflow-hidden">
          {/* Khung chứa tràn viền (tỷ lệ 3/4 chuẩn xác 75% chiều cao video dọc 9/16) */}
          <div className="relative w-full overflow-hidden bg-white aspect-[3/4] max-h-[72vh]">
            {/* YouTube Iframe căn giữa và phóng 118% để đảm bảo video phủ trọn 100% chiều ngang không bị thanh đen hai bên */}
            <iframe
              ref={iframeRef}
              id="top-youtube-iframe"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&controls=0&loop=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1`}
              title="VPBank Video Tư Vấn Vốn"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[118%] aspect-[9/16] pointer-events-none object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => unmuteVideo()}
            />

            {/* LỚP LÀM MỜ VIỀN MỀM MƯỢT TỰ NHIÊN (OPTICAL LENS BLUR + MULTI-STOP EASED VIGNETTE 30%-50%) */}
            {/* 1. Lớp nhòe quang học mượt mà (Optical Gaussian Blur) quanh chu vi 4 cạnh và 4 góc */}
            <div
              className="pointer-events-none absolute inset-0 z-[4]"
              style={{
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                maskImage: 'radial-gradient(ellipse 76% 72% at 50% 50%, transparent 52%, black 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 76% 72% at 50% 50%, transparent 52%, black 100%)',
              }}
            />

            {/* 2. Lớp chuyển màu trắng êm dịu đa tầng không góc gãy (Eased Elliptical Vignette 35%-48%) */}
            <div
              className="pointer-events-none absolute inset-0 z-[5]"
              style={{
                background: `
                  radial-gradient(ellipse 82% 78% at 50% 50%, transparent 45%, rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.16) 72%, rgba(255,255,255,0.28) 84%, rgba(255,255,255,0.40) 93%, rgba(255,255,255,0.48) 100%),
                  linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.18) 7%, transparent 18%, transparent 82%, rgba(255,255,255,0.18) 93%, rgba(255,255,255,0.45) 100%)
                `,
              }}
            />

            {/* 3. VÙNG CHẠM VÀO VIDEO ĐỂ TẠM DỪNG HOẶC PHÁT (TAP TO PAUSE / PLAY) */}
            <button
              type="button"
              id="video-play-pause-tap-area"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Chạm để tạm dừng video' : 'Chạm để phát tiếp video'}
              className="absolute inset-0 z-10 w-full h-full flex items-center justify-center cursor-pointer bg-transparent border-0 outline-none select-none active:scale-[0.99] transition-transform"
            >
              {/* Biểu tượng Play / Pause gợn sóng khi chạm hoặc khi đang tạm dừng */}
              <div
                className={`transition-all duration-300 transform rounded-full p-4 bg-slate-950/60 backdrop-blur-md border border-white/30 text-white shadow-2xl flex items-center justify-center pointer-events-none ${
                  !isPlaying
                    ? 'opacity-100 scale-100'
                    : showIndicator
                    ? 'opacity-100 scale-110'
                    : 'opacity-0 scale-75 pointer-events-none'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white fill-white" />
                ) : (
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Quick Highlights & Action below video */}
        <div className="mt-3 px-3 space-y-2 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Không giữ giấy tờ gốc
            </span>
            <span>•</span>
            <span className="text-emerald-900 font-bold">Hạn mức 500Tr – 2 Tỷ</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={onRegisterClick}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition active:scale-95 cursor-pointer"
            >
              <span>Đăng Ký Nhận Hạn Mức</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <a
              href={HOTLINE_TEL}
              id="top-video-hotline-btn"
              className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold transition active:scale-95 shadow-xs"
            >
              <span>Hotline {HOTLINE}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

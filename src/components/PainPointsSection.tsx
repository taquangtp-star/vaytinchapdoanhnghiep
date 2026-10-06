import React from 'react';
import { AlertTriangle, CheckCircle2, ArrowRight, Ban, FileWarning, TimerOff, Sparkles } from 'lucide-react';

interface PainPointsSectionProps {
  onSelectSolution: () => void;
}

export const PainPointsSection: React.FC<PainPointsSectionProps> = ({ onSelectSolution }) => {
  const painPoints = [
    {
      id: 'pain-1',
      icon: Ban,
      title: 'Sổ Đỏ Bị "Giam" Tại Ngân Hàng Khác',
      painText: 'Sổ đỏ duy nhất đã đem thế chấp vay mua đất/nhà, không còn tài sản để vay thêm vốn lưu động.',
      detail: 'Hầu hết các ngân hàng truyền thống đều từ chối cấp thêm hạn mức nếu sổ đỏ của bạn đang nằm ở ngân hàng khác, khiến bạn hoàn toàn bế tắc dù tài chính kinh doanh vẫn tăng trưởng.',
      solutionTag: 'Đột Phá VPBank',
      solutionText: 'CHẤP NHẬN SỔ ĐANG THẾ CHẤP NƠI KHÁC – KHÔNG THU GIỮ GIẤY TỜ GỐC',
      solutionBenefit: 'Chỉ cần chụp ảnh sổ đỏ đối chiếu, duyệt cấp vốn bổ sung tới 2 TỶ ĐỒNG.'
    },
    {
      id: 'pain-2',
      icon: FileWarning,
      title: 'Dòng Tiền Kẹt, Cơ Hội Lớn Vụt Mất',
      painText: 'Cơ hội nhập hàng giá hời hoặc đơn hàng lớn đến tay nhưng dòng tiền chưa kịp thu hồi.',
      detail: 'Đối tác cần cọc gấp lô hàng chiết khấu cao 30%, hoặc công trình yêu cầu giải ngân vật tư trong tuần. Tiền hàng công nợ của khách chưa về, bạn đành ngậm ngùi nhìn đối thủ thâu tóm.',
      solutionTag: 'Hỗ Trợ Vốn Kịp Thời',
      solutionText: 'XÉT DUYỆT THEO THUẾ & DÒNG TIỀN CASA – XỬ LÝ NHANH 24H - 48H',
      solutionBenefit: 'Đánh giá năng lực dòng tiền thực tế, giải ngân trực tiếp vào tài khoản kinh doanh.'
    },
    {
      id: 'pain-3',
      icon: TimerOff,
      title: 'Sợ Thủ Tục Rườm Rà & Bị Bắt Bẻ Sách Vở',
      painText: 'E ngại thủ tục vay ngân hàng rườm rà, thẩm định lâu làm lỡ mất thời gian vàng.',
      detail: 'Sợ phải làm báo cáo tài chính kiểm toán, sợ bị cán bộ ngân hàng định giá xưởng cửa hàng nhiều lần, sợ chờ đợi 3 tuần đến 1 tháng mới biết hồ sơ có được duyệt hay không.',
      solutionTag: 'Thẩm Định Số Hóa',
      solutionText: 'QUY TRÌNH TINH GỌN – THẨM ĐỊNH HỒ SƠ QUA ETAX & SAO KÊ',
      solutionBenefit: 'Chỉ cần ĐKKD và biên lai nộp thuế hoặc sao kê dòng tiền, quy trình thẩm định nhanh gọn, minh bạch.'
    }
  ];

  return (
    <section className="py-10 bg-slate-100/70 border-b border-slate-200 relative">
      <div className="px-3.5 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Thực Trạng Khó Khăn Của 85% SME</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
            Có Phải Bạn Đang Bị <span className="text-red-600 underline decoration-red-400 decoration-wavy underline-offset-4">"Bó Chân Bó Tay"</span> Vì 3 Rào Cản Này?
          </h2>
          <p className="text-slate-600 text-xs mt-2 leading-relaxed">
            Đơn hàng tấp nập nhưng thiếu vốn lưu động là nỗi đau lớn nhất. Hãy xem VPBank tháo gỡ từng nút thắt:
          </p>
        </div>

        {/* 3 Pain Cards */}
        <div className="space-y-4">
          {painPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Pain Section (Top) */}
                <div className="p-4 sm:p-5 border-b border-slate-100 relative">
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-100">
                      Rào Cản #{idx + 1}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-red-100/60 text-red-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-800 text-xs font-semibold mb-2.5 leading-snug">
                    "{item.painText}"
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                {/* Solution Section (Bottom - VPBank Breakthrough) */}
                <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/60 border-t border-emerald-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-emerald-800 uppercase tracking-wide mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>{item.solutionTag}</span>
                  </div>

                  <div className="text-xs font-black text-emerald-900 leading-snug mb-1.5">
                    {item.solutionText}
                  </div>

                  <div className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug">{item.solutionBenefit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout action banner */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-slate-900 text-white p-4 sm:p-5 flex flex-col gap-3 shadow-lg">
          <div className="space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              Đừng Để Lỡ Cơ Hội Kinh Doanh
            </div>
            <div className="text-base font-black leading-snug">
              Chỉ Cần Biên Lai Nộp Thuế & Ảnh Chụp Sổ Đỏ (Kể Cả Đang Vay Nơi Khác)
            </div>
            <div className="text-xs text-slate-200">
              Hạn mức cấp vốn đến 2 Tỷ Đồng với quy trình thẩm định nhanh chóng từ 24h - 48h làm việc.
            </div>
          </div>

          <button
            onClick={onSelectSolution}
            className="w-full py-3 px-4 rounded-xl font-extrabold text-xs text-slate-900 bg-white hover:bg-emerald-50 shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer mt-1"
          >
            <span>Xem 4 Gói Vốn Chi Tiết</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

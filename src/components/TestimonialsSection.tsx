import React from 'react';
import { TESTIMONIALS } from '../data/loanData';
import { Quote, Star, MapPin, CheckCircle2, Building, Banknote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="bang-chung" className="py-10 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="px-3.5 sm:px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <Star className="w-3.5 h-3.5 fill-current text-yellow-400" />
            <span>Đánh Giá Khách Hàng Thực Tế</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight leading-snug">
            Khách Hàng Tại <span className="text-emerald-400">Hà Nội & Bắc Ninh</span> Nói Gì?
          </h2>
          <p className="text-slate-300 text-xs mt-2 leading-relaxed">
            Họ từng bế tắc khi sổ đỏ bị cắm nơi khác. Xem cách họ tháo gỡ điểm nghẽn dòng tiền cùng VPBank:
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="space-y-3.5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-4 sm:p-5 flex flex-col justify-between shadow-lg hover:border-emerald-500/50 transition-all group"
            >
              <div>
                {/* Header with Approved Amount Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                    Đã duyệt: {t.amountApproved}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-slate-200 text-xs leading-relaxed mb-4 italic relative">
                  <Quote className="w-4 h-4 text-emerald-500/40 inline-block mr-1 -mt-1" />
                  {t.quote}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-700">
                {/* Key Document Highlight */}
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-[10px] text-slate-300 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Hồ sơ nộp:</strong> {t.documentUsed}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-2.5">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/50 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-white truncate">
                      {t.name}
                    </h4>
                    <div className="text-[10px] text-slate-400 font-medium truncate">
                      {t.title} – {t.businessName}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{t.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini stats bar */}
        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-900/80 to-slate-800 border border-emerald-500/30 grid grid-cols-2 gap-3 text-center">
          <div className="p-1">
            <div className="text-xl sm:text-2xl font-black text-amber-300">2 TỶ</div>
            <div className="text-[10px] text-slate-300 mt-0.5 leading-snug">Hạn mức không giữ giấy tờ gốc</div>
          </div>
          <div className="p-1">
            <div className="text-xl sm:text-2xl font-black text-emerald-300">24H</div>
            <div className="text-[10px] text-slate-300 mt-0.5 leading-snug">Thời gian duyệt & giải ngân</div>
          </div>
          <div className="p-1">
            <div className="text-xl sm:text-2xl font-black text-white">96.8%</div>
            <div className="text-[10px] text-slate-300 mt-0.5 leading-snug">Hồ sơ duyệt thành công</div>
          </div>
          <div className="p-1">
            <div className="text-xl sm:text-2xl font-black text-red-400">0 ĐỒNG</div>
            <div className="text-[10px] text-slate-300 mt-0.5 leading-snug">Phí tư vấn & thẩm định</div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { LOAN_PRODUCTS } from '../data/loanData';
import { LoanProduct } from '../types';
import { Check, ShieldCheck, Zap, ArrowRight, Award, ChevronRight, BadgePercent } from 'lucide-react';

interface ProductMatrixSectionProps {
  onSelectProduct: (product: LoanProduct) => void;
}

export const ProductMatrixSection: React.FC<ProductMatrixSectionProps> = ({ onSelectProduct }) => {
  return (
    <section id="giai-phap" className="py-10 bg-white relative">
      <div className="px-3.5 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <Award className="w-3.5 h-3.5" />
            <span>Ma Trận Gói Cấp Vốn SME</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
            4 Giải Pháp Cấp Vốn <span className="text-emerald-600">Riêng</span> Cho Từng Khách Hàng
          </h2>
          <p className="text-slate-600 text-xs mt-2 leading-relaxed">
            Dù bạn cần 2 tỷ, vài trăm triệu, hay dòng tiền linh hoạt — VPBank đều có giải pháp thẩm định tinh gọn, giải ngân nhanh chóng.
          </p>
        </div>

        {/* Product Grid */}
        <div className="space-y-4 items-stretch">
          {LOAN_PRODUCTS.map((prod) => {
            const isFeatured = prod.popular;
            return (
              <div
                key={prod.id}
                className={`rounded-2xl flex flex-col justify-between transition-all duration-300 overflow-hidden ${
                  isFeatured
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white shadow-xl ring-2 ring-emerald-500'
                    : 'bg-white text-slate-900 border border-slate-200 shadow-sm'
                }`}
              >
                {/* Popular Top Strip */}
                {isFeatured && (
                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-[10px] font-black uppercase tracking-wider py-1 px-3 text-center flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 fill-current text-yellow-300" />
                    <span>LỰA CHỌN PHỔ BIẾN NHẤT (HOT)</span>
                  </div>
                )}

                <div className="p-4 sm:p-5">
                  {/* Category Badge & Title */}
                  <div className="mb-2">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded tracking-wider uppercase inline-block mb-1.5 ${
                        isFeatured
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {prod.badge}
                    </span>
                    <h3
                      className={`text-base font-black leading-snug ${
                        isFeatured ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {prod.title}
                    </h3>
                  </div>

                  {/* Max Limit */}
                  <div className="my-3 py-2 px-3 rounded-xl border border-dashed transition-colors flex items-center justify-between gap-2 bg-slate-500/10">
                    <span className={`text-xs font-semibold ${isFeatured ? 'text-slate-300' : 'text-slate-500'}`}>
                      Hạn mức tối đa:
                    </span>
                    <span
                      className={`text-base sm:text-lg font-black ${
                        isFeatured ? 'text-amber-300' : 'text-emerald-700'
                      }`}
                    >
                      {prod.maxLimit}
                    </span>
                  </div>

                  {/* Key Highlight (Crucial for Upper HHB - TAX: Không giữ giấy tờ gốc) */}
                  <div
                    className={`p-2.5 rounded-xl text-xs font-bold mb-3 leading-relaxed ${
                      isFeatured
                        ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                        : 'bg-emerald-50/90 text-emerald-900 border border-emerald-200'
                    }`}
                  >
                    ⭐ {prod.highlight}
                  </div>

                  {/* Interest Rate & Condition */}
                  <div className="space-y-1.5 mb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <BadgePercent className={`w-3.5 h-3.5 shrink-0 ${isFeatured ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <span className="font-semibold text-[11px]">Lãi suất:</span>
                      <span className={`font-extrabold text-xs ${isFeatured ? 'text-white' : 'text-slate-900'}`}>
                        {prod.interestRate}
                      </span>
                    </div>

                    <div className="text-[11px] leading-relaxed opacity-90">
                      <strong className="font-semibold">Điều kiện: </strong>
                      <span>{prod.condition}</span>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-1.5 pt-2.5 border-t border-slate-200/20 text-xs">
                    {prod.bulletPoints.map((bp, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isFeatured ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
                        <span className={`text-[11px] leading-snug ${isFeatured ? 'text-slate-200' : 'text-slate-700'}`}>
                          {bp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-4 pt-0 sm:p-5 sm:pt-0">
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className={`w-full py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isFeatured
                        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 text-white shadow-md shadow-red-600/30 active:scale-[0.99]'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm active:scale-[0.99]'
                    }`}
                  >
                    <span>Đăng Ký Gói Này Ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-center mt-1.5 text-slate-400">
                    Tư vấn miễn phí • Bảo mật 100%
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Chưa chắc chắn doanh nghiệp của bạn phù hợp gói nào nhất?{' '}
            <a
              href="#tinh-han-muc"
              className="text-emerald-600 font-bold underline underline-offset-4 hover:text-emerald-800"
            >
              Sử dụng công cụ tính thử hạn mức tự động bên dưới ↓
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

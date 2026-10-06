import React, { useState } from 'react';
import { Shield, Zap, Award, CheckCircle2, ArrowRight, FileCheck, Building2, UserCheck, Lock, ChevronRight, PhoneCall } from 'lucide-react';
import { HOTLINE, HOTLINE_TEL } from '../data/loanData';
import { LeadData } from '../types';

interface HeroSectionProps {
  onQuickSubmit: (data: Partial<LeadData>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onQuickSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [capitalNeed, setCapitalNeed] = useState('1000000000'); // Default 1 Billion
  const [businessType, setBusinessType] = useState<'enterprise' | 'household' | 'ecommerce'>('household');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Vui lòng nhập số điện thoại hợp lệ (ít nhất 10 số).');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onQuickSubmit({
        fullName,
        phoneNumber: cleanPhone,
        capitalNeed: Number(capitalNeed),
        businessType,
        redBookStatus: 'mortgaged_other_bank',
        location: 'Hà Nội / Bắc Ninh'
      });
    }, 600);
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000000000) {
      return `${(val / 1000000000).toFixed(val % 1000000000 === 0 ? 0 : 1)} TỶ`;
    }
    return `${Math.round(val / 1000000)} TRIỆU`;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white pt-6 pb-12">
      {/* Decorative Glow & Geometry */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-60 h-60 bg-red-600/15 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="relative px-3.5 sm:px-4">
        <div className="space-y-6">
          {/* Direct-Response Copywriting */}
          <div className="space-y-4">
            <h1 className="text-2xl font-black leading-[1.2] tracking-tight text-white">
              BỔ SUNG VỐN KINH DOANH{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">
                500 TRIỆU – 2 TỶ
              </span>
              :<br />
              <span className="text-amber-300 font-extrabold"> KHÔNG GIỮ GIẤY TỜ GỐC</span> –{' '}
              <span className="underline decoration-emerald-400 underline-offset-4 decoration-2">XỬ LÝ 24H - 48H</span>
            </h1>

            <p className="text-xs text-slate-200 font-normal leading-relaxed">
              Giải pháp cấp vốn tín chấp vượt trội <strong className="text-white font-bold">VPBank</strong> dành riêng cho{' '}
              <strong className="text-emerald-300">Chủ Doanh Nghiệp & Hộ Kinh Doanh</strong> tại Hà Nội - Bắc Ninh.{' '}
              <span className="bg-emerald-900/60 text-emerald-200 px-1.5 py-0.5 rounded font-semibold border border-emerald-500/30 inline-block mt-1">
                Sổ đỏ đang thế chấp ngân hàng khác vẫn được hỗ trợ!
              </span>
            </p>

            {/* 3 Core Highlight Bullets */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Không Giữ Giấy Tờ Gốc</div>
                  <div className="text-[11px] text-slate-300">Chỉ kiểm tra bản sao đối chiếu, không phong tỏa tài sản</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Sổ Đang Thế Chấp Bank Khác</div>
                  <div className="text-[11px] text-slate-300">Vẫn được xét cấp tín chấp bổ sung theo thuế</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Thẩm Định 24H - 48H</div>
                  <div className="text-[11px] text-slate-300">Tính lãi dư nợ giảm dần theo quy chuẩn VPBank</div>
                </div>
              </div>
            </div>

            {/* Social Trust Proof Bar */}
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-emerald-400 object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Khách hàng VPBank"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-emerald-400 object-cover"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Khách hàng VPBank"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-emerald-400 object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                    alt="Khách hàng VPBank"
                  />
                </div>
                <span className="text-[11px]">
                  <strong className="text-emerald-300 font-bold">1,280+ Doanh nghiệp & Hộ KD</strong> đã nhận giải ngân
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px]">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Thương hiệu Tài chính Uy tín Hàng đầu Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Form container */}
          <div className="pt-2">
            <div className="rounded-2xl bg-white text-slate-900 p-4 sm:p-5 shadow-2xl border border-emerald-500/30">
              {/* Header */}
              <div className="text-center mb-3.5">
                <h2 className="text-lg font-black text-slate-900 tracking-tight leading-snug uppercase">
                  ĐĂNG KÝ TƯ VẤN MIỄN PHÍ
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Ước tính hạn mức sơ bộ • Chuyên viên ngân hàng liên hệ tư vấn miễn phí
                </p>
              </div>

              {errorMsg && (
                <div className="mb-3.5 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Họ và tên của bạn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-hidden transition"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5 text-emerald-600" />
                      Bảo mật 100%
                    </span>
                  </div>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0987.xxx.xxx hoặc 0359.xxx.xxx"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-hidden transition"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Loại hình kinh doanh hiện tại
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setBusinessType('enterprise')}
                      className={`py-2 px-1 rounded-lg text-xs font-bold border transition text-center cursor-pointer ${
                        businessType === 'enterprise'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Doanh Nghiệp
                    </button>
                    <button
                      type="button"
                      onClick={() => setBusinessType('household')}
                      className={`py-2 px-1 rounded-lg text-xs font-bold border transition text-center cursor-pointer ${
                        businessType === 'household'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Hộ Kinh Doanh
                    </button>
                    <button
                      type="button"
                      onClick={() => setBusinessType('ecommerce')}
                      className={`py-2 px-1 rounded-lg text-xs font-bold border transition text-center cursor-pointer ${
                        businessType === 'ecommerce'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Shop Online
                    </button>
                  </div>
                </div>

                {/* Capital Need Slider / Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Nhu cầu vốn dự kiến:
                    </label>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {formatCurrency(Number(capitalNeed))}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="200000000"
                    max="2000000000"
                    step="50000000"
                    value={capitalNeed}
                    onChange={(e) => setCapitalNeed(e.target.value)}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                    <span>200 Triệu</span>
                    <span>1 Tỷ</span>
                    <span>2 TỶ (Tối đa)</span>
                  </div>
                </div>

                {/* Quick note on Red Book condition */}
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-start gap-1.5 leading-snug">
                  <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Chính sách đặc biệt:</strong> Sổ đỏ đang thế chấp bank khác (VCB, BIDV...) vẫn được cấp thêm hạn mức!
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 text-white font-black text-xs shadow-md shadow-red-600/30 transition-all active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Đang phân tích hồ sơ...
                    </span>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4 text-white shrink-0" />
                      <span>ĐĂNG KÝ KIỂM TRA HẠN MỨC</span>
                      <ArrowRight className="w-4 h-4 text-white shrink-0" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    Bảo mật chuẩn VPBank
                  </span>
                  <span>•</span>
                  <span>Miễn phí tư vấn 100%</span>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Trust Badges (Required: "Phê duyệt bởi VPBank", "Bảo mật thông tin 100%", "Giải ngân trong ngày") */}
        <div className="mt-8 pt-5 border-t border-white/10 space-y-2.5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-white text-xs">Phê Duyệt Bởi VPBank</div>
              <div className="text-[11px] text-slate-300 leading-tight">Thẩm định đơn giản, nhanh chóng và bảo mật</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-white text-xs">Bảo Mật Thông Tin 100%</div>
              <div className="text-[11px] text-slate-300 leading-tight">Dữ liệu mã hóa tuyệt đối, bảo vệ quyền riêng tư</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-white text-xs">Xử Lý Nhanh 24H - 48H</div>
              <div className="text-[11px] text-slate-300 leading-tight">Quy trình thẩm định minh bạch, giải ngân đúng tiến độ</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { FAQS, HOTLINE, HOTLINE_TEL, ZALO_URL } from '../data/loanData';
import { LeadData } from '../types';
import { HelpCircle, ChevronDown, ChevronUp, Lock, Send, ShieldCheck, CheckCircle2, PhoneCall, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';

interface LeadFormAndFaqSectionProps {
  initialData?: Partial<LeadData>;
  onSubmitLead: (data: LeadData) => void;
}

export const LeadFormAndFaqSection: React.FC<LeadFormAndFaqSectionProps> = ({ initialData, onSubmitLead }) => {
  // Form State
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phoneNumber || '');
  const [businessType, setBusinessType] = useState<'enterprise' | 'household' | 'ecommerce'>(initialData?.businessType || 'household');
  const [capitalNeed, setCapitalNeed] = useState<number>(initialData?.capitalNeed || 1000000000);
  const [redBookStatus, setRedBookStatus] = useState<'mortgaged_other_bank' | 'unencumbered' | 'no_red_book'>(
    initialData?.redBookStatus || 'mortgaged_other_bank'
  );
  const [location, setLocation] = useState('Hà Nội');
  const [urgentNote, setUrgentNote] = useState('');
  const [taxInfo, setTaxInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<string>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? '' : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên của người đại diện hoặc chủ hộ kinh doanh.');
      return;
    }
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Vui lòng nhập số điện thoại hợp lệ để nhận lịch hẹn thẩm định.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    const lead: LeadData = {
      fullName,
      phoneNumber: cleanPhone,
      businessType,
      capitalNeed,
      redBookStatus,
      location,
      taxOrRevenue: taxInfo,
      urgentNote,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      onSubmitLead(lead);
    }, 700);
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000000000) {
      return `${(val / 1000000000).toFixed(val % 1000000000 === 0 ? 0 : 1)} TỶ ĐỒNG`;
    }
    return `${Math.round(val / 1000000)} TRIỆU ĐỒNG`;
  };

  return (
    <section id="dang-ky" className="py-10 bg-white relative">
      <div className="px-3.5 sm:px-4">
        <div className="space-y-8 items-start">
          {/* Form */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-lg relative">
            {/* Top Accent Strip */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Tiếp Nhận & Xử Lý Trong 24H
              </span>
              <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                Mã Hóa 256-bit
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1 leading-snug">
              Đăng Ký Hồ Sơ Vay Vốn VPBank
            </h2>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Điền thông tin bên dưới để Chuyên viên Tín dụng VPBank phụ trách khu vực Hà Nội - Bắc Ninh kiểm tra hạn mức và liên hệ trong 15 phút:
            </p>

            {success ? (
              <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-black text-emerald-950">GỬI HỒ SƠ THÀNH CÔNG!</h3>
                  <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto leading-relaxed">
                    Cảm ơn <strong className="text-slate-900">{fullName}</strong>! Yêu cầu vay <strong className="text-emerald-900">{formatCurrency(capitalNeed)}</strong> của bạn đã được tiếp nhận. Chuyên viên VPBank sẽ gọi điện tư vấn và hướng dẫn duyệt hạn mức ngay trong ngày.
                  </p>
                </div>

                <div className="pt-1 flex flex-col gap-2">
                  <a
                    href={HOTLINE_TEL}
                    className="w-full py-2.5 px-4 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Cần Gấp? Gọi: {HOTLINE}</span>
                  </a>
                  <a
                    href={ZALO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Trực Tiếp Zalo</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {errorMsg && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 2-Column Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Họ và tên người đại diện <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm font-medium text-slate-900 bg-white outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Số điện thoại liên hệ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="09xx.xxx.xxx"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm font-medium text-slate-900 bg-white outline-hidden"
                    />
                  </div>
                </div>

                {/* Business Type & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Loại hình kinh doanh <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm font-medium text-slate-900 bg-white outline-hidden cursor-pointer"
                    >
                      <option value="enterprise">Doanh nghiệp TNHH / Cổ phần</option>
                      <option value="household">Hộ kinh doanh cá thể / Tiệm kinh doanh</option>
                      <option value="ecommerce">Chủ shop E-Commerce (Shopee, TikTok, Lazada)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Khu vực hoạt động <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm font-medium text-slate-900 bg-white outline-hidden cursor-pointer"
                    >
                      <option value="Hà Nội">Hà Nội (Tất cả quận huyện)</option>
                      <option value="Bắc Ninh">Bắc Ninh (KCN & Thành phố)</option>
                      <option value="Vĩnh Phúc / Hưng Yên / Hải Dương">Vùng lân cận (Hưng Yên, Vĩnh Phúc...)</option>
                      <option value="Khu vực khác">Tỉnh thành khác</option>
                    </select>
                  </div>
                </div>

                {/* Red Book Status (High Converting Feature) */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tình trạng Sổ đỏ / Bất động sản hiện tại
                  </label>
                  <div className="space-y-1.5">
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                        redBookStatus === 'mortgaged_other_bank'
                          ? 'bg-emerald-100/70 border-emerald-600 text-emerald-950 font-bold'
                          : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="redBook"
                        checked={redBookStatus === 'mortgaged_other_bank'}
                        onChange={() => setRedBookStatus('mortgaged_other_bank')}
                        className="accent-emerald-600 shrink-0"
                      />
                      <span>Đang thế chấp bank khác (Vẫn duyệt tới 2 Tỷ)</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                        redBookStatus === 'unencumbered'
                          ? 'bg-emerald-100/70 border-emerald-600 text-emerald-950 font-bold'
                          : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="redBook"
                        checked={redBookStatus === 'unencumbered'}
                        onChange={() => setRedBookStatus('unencumbered')}
                        className="accent-emerald-600 shrink-0"
                      />
                      <span>Đã có sổ đỏ (Không thu giữ bản gốc)</span>
                    </label>

                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                        redBookStatus === 'no_red_book'
                          ? 'bg-emerald-100/70 border-emerald-600 text-emerald-950 font-bold'
                          : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="redBook"
                        checked={redBookStatus === 'no_red_book'}
                        onChange={() => setRedBookStatus('no_red_book')}
                        className="accent-emerald-600 shrink-0"
                      />
                      <span>Chưa có sổ đỏ (Vay theo thuế / CASA)</span>
                    </label>
                  </div>
                </div>

                {/* Capital Need Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Hạn mức vốn cần vay:
                    </label>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      {formatCurrency(capitalNeed)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000000"
                    max="2000000000"
                    step="50000000"
                    value={capitalNeed}
                    onChange={(e) => setCapitalNeed(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-300 rounded-lg"
                  />
                </div>

                {/* Tax / Additional notes */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Thông tin thêm (Mức thuế đóng hàng tháng/năm, hoặc thời hạn cần giải ngân)
                  </label>
                  <input
                    type="text"
                    value={taxInfo}
                    onChange={(e) => setTaxInfo(e.target.value)}
                    placeholder="Ví dụ: Đóng thuế khoán 2 triệu/tháng, cần hạn mức bổ sung..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs font-medium text-slate-900 bg-white outline-hidden"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Đang xử lý hồ sơ...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-yellow-300" />
                      <span>GỬI HỒ SƠ PHÊ DUYỆT NGAY HÔM NAY</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Bảo mật thông tin chuẩn VPBank
                  </span>
                  <span>Tư vấn phương án tín dụng tối ưu</span>
                </div>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div id="cau-hoi" className="w-full space-y-3 pt-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Giải Đáp Nhanh Thắc Mắc</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Câu Hỏi Thường Gặp (FAQ)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Các câu hỏi thiết thực nhất trước khi làm hồ sơ vay vốn:
              </p>
            </div>

            <div className="space-y-2.5">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen
                        ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full text-left p-3.5 flex items-start justify-between gap-2.5 cursor-pointer"
                    >
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                        {faq.question}
                      </span>
                      <span className="shrink-0 p-1 rounded-full bg-slate-100 text-slate-600 mt-0.5">
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-slate-700 leading-relaxed border-t border-emerald-200/50 pt-2.5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Consultant Contact Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white shadow-md space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-300">Cần tư vấn trực tiếp trường hợp cụ thể?</div>
                  <div className="text-base font-black text-amber-300">Hotline: {HOTLINE}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Đội ngũ chuyên viên VPBank khu vực Hà Nội & Bắc Ninh sẵn sàng hỗ trợ kiểm tra CIC và tư vấn trực tiếp tận nơi.
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <a
                  href={HOTLINE_TEL}
                  className="flex-1 py-2 px-3 text-center rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                >
                  Gọi Ngay 24/7
                </a>
                <a
                  href={ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 text-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Nhắn Tin Zalo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

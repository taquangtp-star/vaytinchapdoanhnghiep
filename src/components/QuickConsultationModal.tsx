import React, { useState } from 'react';
import { X, ShieldCheck, ArrowRight, Sparkles, Building2, Send } from 'lucide-react';
import { LoanProduct, LeadData } from '../types';

interface QuickConsultationModalProps {
  isOpen: boolean;
  selectedProduct: LoanProduct | null;
  onClose: () => void;
  onSubmit: (lead: Partial<LeadData>) => void;
}

export const QuickConsultationModal: React.FC<QuickConsultationModalProps> = ({
  isOpen,
  selectedProduct,
  onClose,
  onSubmit
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [redBookStatus, setRedBookStatus] = useState<'mortgaged_other_bank' | 'unencumbered' | 'no_red_book'>(
    'mortgaged_other_bank'
  );
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
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
      onSubmit({
        fullName,
        phoneNumber: cleanPhone,
        redBookStatus,
        urgentNote: selectedProduct ? `Đăng ký gói: ${selectedProduct.title}` : 'Đăng ký tư vấn trực tiếp'
      });
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 pr-8">
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 inline-block mb-1.5">
            Đăng Ký Trực Tiếp
          </span>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
            {selectedProduct ? selectedProduct.title : 'Kiểm Tra Điều Kiện Cấp Vốn'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Chuyên viên VPBank sẽ liên hệ hỗ trợ thẩm định và thông báo hạn mức dự kiến.
          </p>
        </div>

        {selectedProduct && (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mb-3.5 text-xs space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Hạn mức tối đa:</span>
              <strong className="text-emerald-700 font-black">{selectedProduct.maxLimit}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Lãi suất:</span>
              <strong className="text-slate-900">{selectedProduct.interestRate}</strong>
            </div>
            <div className="text-[11px] text-emerald-800 font-semibold pt-0.5">
              ✓ {selectedProduct.highlight}
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mb-3 p-2 rounded-lg bg-red-50 text-red-600 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Họ và tên của bạn <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm font-medium text-slate-900 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="09xx.xxx.xxx"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm font-medium text-slate-900 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tình trạng Sổ đỏ hiện tại
            </label>
            <select
              value={redBookStatus}
              onChange={(e) => setRedBookStatus(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs font-medium text-slate-900 outline-hidden cursor-pointer"
            >
              <option value="mortgaged_other_bank">Đang thế chấp tại ngân hàng khác (Hạn mức đến 2 Tỷ)</option>
              <option value="unencumbered">Đã có sổ đỏ (Chưa thế chấp)</option>
              <option value="no_red_book">Chưa có sổ đỏ (Vay tín chấp)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30 transition cursor-pointer"
          >
            {isSubmitting ? (
              <span>Đang gửi thông tin...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span>NHẬN TƯ VẤN HẠN MỨC (MIỄN PHÍ)</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Không giữ giấy tờ gốc • Bảo mật 100%</span>
          </div>
        </form>
      </div>
    </div>
  );
};

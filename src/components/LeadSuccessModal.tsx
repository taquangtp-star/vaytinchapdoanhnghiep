import React from 'react';
import { CheckCircle, Phone, MessageCircle, X, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { LeadData } from '../types';
import { HOTLINE, HOTLINE_TEL, ZALO_URL } from '../data/loanData';

interface LeadSuccessModalProps {
  isOpen: boolean;
  leadData: Partial<LeadData> | null;
  onClose: () => void;
}

export const LeadSuccessModal: React.FC<LeadSuccessModalProps> = ({ isOpen, leadData, onClose }) => {
  if (!isOpen || !leadData) return null;

  const refCode = `VPB-${Math.floor(100000 + Math.random() * 900000)}`;

  const formatCurrency = (val?: number) => {
    if (!val) return '500 TRIỆU – 2 TỶ';
    if (val >= 1000000000) {
      return `${(val / 1000000000).toFixed(val % 1000000000 === 0 ? 0 : 1)} TỶ ĐỒNG`;
    }
    return `${Math.round(val / 1000000)} TRIỆU ĐỒNG`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-7 h-7" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-600 fill-emerald-600" />
            <span>Hồ Sơ Đã Được Chấp Thuận Sơ Bộ</span>
          </div>

          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Đăng Ký Thành Công!
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed">
            Xin chào <strong className="text-slate-900">{leadData.fullName}</strong>, yêu cầu cấp vốn kinh doanh của bạn đã được chuyển tới Giám Đốc Tín Dụng SME VPBank.
          </p>
        </div>

        {/* Lead Ticket Summary Box */}
        <div className="my-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Mã hồ sơ:</span>
            <span className="font-mono font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
              {refCode}
            </span>
          </div>

          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Nhu cầu cấp vốn:</span>
            <span className="font-extrabold text-emerald-700 text-xs sm:text-sm">
              {formatCurrency(leadData.capitalNeed)}
            </span>
          </div>

          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Chính sách:</span>
            <span className="font-bold text-slate-900">Không giữ giấy tờ gốc • Thẩm định nhanh</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Dự kiến liên hệ:</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              Trong giờ làm việc
            </span>
          </div>
        </div>

        {/* Instant Action buttons */}
        <div className="space-y-2">
          <a
            href={HOTLINE_TEL}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30 transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Cần Hỗ Trợ Trực Tiếp? Gọi Hotline {HOTLINE}</span>
          </a>

          <a
            href={ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Gửi Ảnh Chứng Từ Qua Zalo</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
          >
            Đóng cửa sổ này
          </button>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>VPBank cam kết bảo mật thông tin tài chính 100%</span>
        </div>
      </div>
    </div>
  );
};

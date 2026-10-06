import React, { useState } from 'react';
import { Phone, ShieldCheck, CheckCircle2, Clock, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { HOTLINE, HOTLINE_TEL, ZALO_URL } from '../data/loanData';

interface HeaderProps {
  onOpenConsultationModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultationModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Main Navigation Bar */}
      <div className="px-3">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Sub-brand */}
          <div className="flex items-center gap-2 min-w-0">
            <a href="#" className="flex items-center gap-2 group min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
                <span>VP</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-base font-black tracking-tight text-slate-900 leading-none">
                    VP<span className="text-emerald-600">Bank</span>
                  </span>
                  <span className="text-[9px] font-black px-1 py-0.2 rounded bg-red-100 text-red-700 border border-red-200 uppercase shrink-0">
                    SME
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5 truncate max-w-[140px]">
                  Cấp Vốn Doanh Nghiệp
                </span>
              </div>
            </a>
          </div>

          {/* Quick Hotline & Mobile Menu Toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={HOTLINE_TEL}
              className="px-2.5 py-1.5 rounded-lg bg-red-600 text-white flex items-center gap-1 text-[11px] font-black shadow-xs active:scale-95 transition"
              aria-label="Gọi ngay"
            >
              <Phone className="w-3 h-3 animate-pulse" />
              <span>{HOTLINE}</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition active:scale-95 cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-xl animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <a
              href={HOTLINE_TEL}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-red-600 text-white font-bold text-xs shadow-sm shadow-red-600/20"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gọi: {HOTLINE}</span>
            </a>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm shadow-blue-600/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Zalo Trực Tiếp</span>
            </a>
          </div>
          <div className="space-y-1 text-xs font-semibold text-slate-700">
            <button
              onClick={() => scrollToSection('giai-phap')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
            >
              <span>1. Các Gói Vốn Cốt Lõi (Đến 2 Tỷ)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </button>
            <button
              onClick={() => scrollToSection('tinh-han-muc')}
              className="w-full text-left py-2 px-3 rounded-lg bg-emerald-50 text-emerald-800 font-bold flex items-center justify-between"
            >
              <span>2. Công Cụ Tính Hạn Mức Tự Động</span>
              <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded">Hot</span>
            </button>
            <button
              onClick={() => scrollToSection('so-sanh')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              3. So Sánh Với Thế Chấp Thông Thường
            </button>
            <button
              onClick={() => scrollToSection('quy-trinh')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              4. Quy Trình Duyệt 24 Giờ
            </button>
            <button
              onClick={() => scrollToSection('bang-chung')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              5. Khách Hàng Hà Nội & Bắc Ninh Vay Thành Công
            </button>
            <button
              onClick={() => scrollToSection('cau-hoi')}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50"
            >
              6. Giải Đáp Thắc Mắc (FAQ)
            </button>
          </div>

          <div className="pt-1">
            <button
              onClick={() => scrollToSection('dang-ky')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs text-center shadow-md flex items-center justify-center gap-2"
            >
              <span>Đăng Ký Nhận Hạn Mức Ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

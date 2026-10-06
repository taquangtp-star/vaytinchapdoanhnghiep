import React from 'react';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';
import { HOTLINE, HOTLINE_TEL, ZALO_URL } from '../data/loanData';

interface MobileStickyBarProps {
  onOpenQuickForm: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenQuickForm }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 w-full max-w-[440px] mx-auto bg-slate-900/95 backdrop-blur-md border-t border-x border-slate-700/80 p-2.5 px-3 shadow-2xl pb-[max(0.625rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-12 gap-2 items-center">
        {/* Call Button (4 cols) */}
        <a
          href={HOTLINE_TEL}
          className="col-span-4 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 active:scale-95 transition"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          <span className="truncate">Gọi Hotline</span>
        </a>

        {/* Zalo Button (4 cols) */}
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-4 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 active:scale-95 transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="truncate">Chat Zalo</span>
        </a>

        {/* Consultation Button (4 cols) */}
        <button
          onClick={onOpenQuickForm}
          className="col-span-4 flex items-center justify-center gap-1 py-3 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 active:scale-95 transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 fill-current" />
          <span className="truncate">Tư vấn</span>
        </button>
      </div>
    </div>
  );
};

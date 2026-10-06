import React from 'react';
import { COMPARISON_DATA } from '../data/loanData';
import { CheckCircle2, XCircle, ArrowRight, ShieldAlert, Sparkles, Scale } from 'lucide-react';

interface ComparisonTableProps {
  onRegisterClick: () => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onRegisterClick }) => {
  return (
    <section id="so-sanh" className="py-10 bg-slate-50 border-b border-slate-200 relative">
      <div className="px-3.5 sm:px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <Scale className="w-3.5 h-3.5" />
            <span>So Sánh Thực Tế</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
            Thế Chấp Thường vs. <span className="text-emerald-600">Cấp Vốn VPBank</span>
          </h2>
          <p className="text-slate-600 text-xs mt-2 leading-relaxed">
            Tại sao chủ doanh nghiệp tại Hà Nội & Bắc Ninh lựa chọn giải pháp tín chấp VPBank?
          </p>
        </div>

        {/* Comparison Cards for Mobile */}
        <div className="space-y-3">
          {COMPARISON_DATA.map((row, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs space-y-2.5"
            >
              {/* Criteria Title */}
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <span className="font-extrabold text-slate-900 text-xs">
                  {row.criteria}
                </span>
              </div>

              {/* Two Comparison Boxes */}
              <div className="space-y-1.5 pt-0.5">
                {/* Traditional Bank */}
                <div className="flex items-start gap-2 p-2 rounded-lg bg-red-50/60 border border-red-100 text-[11px] text-slate-700">
                  <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-red-700 mr-1">Ngân hàng khác:</span>
                    <span className="text-slate-600">{row.traditional}</span>
                  </div>
                </div>

                {/* VPBank Solution */}
                <div className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-emerald-800 mr-1">VPBank SME:</span>
                    <span className="font-bold text-emerald-900">{row.vpbank}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white space-y-2.5 shadow-md">
          <div className="text-center">
            <span className="font-bold text-emerald-400 text-xs">Đang thế chấp sổ đỏ vay ngân hàng khác? </span>
            <span className="text-slate-300 text-[11px] block mt-0.5">VPBank vẫn xem xét cấp tín chấp bổ sung theo doanh thu thuế!</span>
          </div>
          <button
            onClick={onRegisterClick}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Đăng Ký Thẩm Định Ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

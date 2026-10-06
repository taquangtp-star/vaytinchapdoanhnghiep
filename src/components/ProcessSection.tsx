import React from 'react';
import { Smartphone, Headphones, CheckCircle2, Clock, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';

interface ProcessSectionProps {
  onStartNow: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onStartNow }) => {
  const steps = [
    {
      step: '01',
      time: 'Chỉ mất 1 Phút',
      title: 'Đăng Ký Thông Tin Trực Tuyến',
      desc: 'Điền form thông tin đơn giản gồm Tên, SĐT, Nhu cầu vốn và Loại hình kinh doanh ngay trên website. Hệ thống mã hóa thông tin bảo mật 100%.',
      icon: Smartphone,
      highlight: 'Không cần tải giấy tờ phức tạp',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      step: '02',
      time: 'Sau 15 - 30 Phút',
      title: 'Kiểm Tra Điều Kiện CIC & Hạn Mức',
      desc: 'Chuyên viên Khối Tín dụng SME VPBank gọi điện xác thực, tra cứu lịch sử CIC và thông báo hạn mức dự kiến được duyệt cùng lãi suất ưu đãi.',
      icon: Headphones,
      highlight: 'Tư vấn miễn phí tận nơi (Hà Nội - Bắc Ninh)',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      step: '03',
      time: 'Sau 24h - 48h Làm Việc',
      title: 'Phê Duyệt & Giải Ngân Đúng Hẹn',
      desc: 'Khách hàng cung cấp bản sao sổ đỏ đối chiếu (hoặc chứng từ nộp thuế / sao kê tài khoản). Hợp đồng tín dụng được ký kết chính thức với VPBank và tiền được giải ngân trực tiếp vào tài khoản.',
      icon: CheckCircle2,
      highlight: 'KHÔNG giữ bản gốc sổ đỏ',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    }
  ];

  return (
    <section id="quy-trinh" className="py-10 bg-white relative">
      <div className="px-3.5 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Quy Trình Tinh Gọn</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
            Nhận Tiền Giải Ngân Trong <span className="text-emerald-600">3 Bước Đơn Giản</span>
          </h2>
          <p className="text-slate-600 text-xs mt-2 leading-relaxed">
            Thẩm định cấp vốn tại VPBank đã được số hóa tối đa, không cần đi lại nhiều lần.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="space-y-3.5 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs transition-all duration-300 flex flex-col justify-between group hover:border-emerald-300"
              >
                {/* Step Number Background */}
                <div className="absolute top-3.5 right-4 text-3xl font-black text-slate-200/80 select-none">
                  {item.step}
                </div>

                <div>
                  {/* Icon & Time Badge */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                      ⏱ {item.time}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1.5 leading-snug pr-8">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-200/60">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Strip */}
        <div className="mt-8 text-center">
          <button
            onClick={onStartNow}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all active:scale-95 cursor-pointer"
          >
            <span>BẮT ĐẦU BƯỚC 1: ĐĂNG KÝ TRỰC TUYẾN (1 PHÚT)</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};

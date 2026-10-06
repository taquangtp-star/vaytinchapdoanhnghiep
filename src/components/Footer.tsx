import React from 'react';
import { HOTLINE, HOTLINE_TEL, ZALO_URL } from '../data/loanData';
import { ShieldCheck, MapPin, Phone, Mail, Clock, Award, Building2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-10 pb-28 border-t border-slate-800">
      <div className="px-4">
        <div className="space-y-8 pb-8 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                <span>VP</span>
              </div>
              <div>
                <div className="text-lg font-black text-white tracking-tight">
                  VP<span className="text-emerald-500">Bank</span> SME
                </div>
                <div className="text-[11px] text-slate-400">
                  Khối Khách Hàng Doanh Nghiệp & Hộ Kinh Doanh
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Giải pháp cấp vốn tín chấp và hạn mức thuế đột phá từ Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank). Đồng hành cùng các Chủ Doanh nghiệp và Hộ kinh doanh vượt qua rào cản tài sản thế chấp để bứt phá quy mô.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Chính sách phê duyệt số hóa không giữ giấy tờ gốc</span>
            </div>
          </div>

          {/* Regional Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Khu Vực Phục Vụ Trọng Điểm
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Khu vực Hà Nội:</strong>
                  <div>Tòa nhà VPBank Tower, 89 Láng Hạ, Đống Đa & PGD toàn thành phố.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Khu vực Bắc Ninh:</strong>
                  <div>KCN Quế Võ, TP. Bắc Ninh, Từ Sơn, Yên Phong, Thuận Thành.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Thời gian hỗ trợ:</strong>
                  <div>24/7 (Cả Thứ Bảy, Chủ Nhật & ngày Lễ)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Support & Hotlines */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Kênh Tiếp Nhận Hồ Sơ Trực Tiếp
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={HOTLINE_TEL}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Hotline Giám Đốc Tín Dụng</div>
                  <div className="text-sm font-black text-red-400">{HOTLINE}</div>
                </div>
              </a>

              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <span className="text-xs font-black">Zalo</span>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Tư Vấn Hồ Sơ Riêng Tư</div>
                  <div className="text-sm font-black text-blue-400">Zalo: {HOTLINE}</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 text-center text-xs text-slate-500 space-y-2">
          <p>
            Thông tin lãi suất từ 19% - 26%/năm tính trên dư nợ giảm dần và các sản phẩm tín dụng được áp dụng theo quy chế hiện hành của Ngân hàng VPBank dành cho Phân khúc Khách hàng Doanh nghiệp & Hộ kinh doanh.
          </p>
          <p className="text-[11px] text-slate-400">
            * Cảnh báo: VPBank không thu bất kỳ khoản phí hồ sơ, phí môi giới nào từ khách hàng. Mọi thủ tục ký kết hợp đồng tín dụng đều được thực hiện trực tiếp với Cán bộ Ngân hàng chính thức. Khách hàng chú ý cảnh giác trước các thủ đoạn mạo danh hoặc tổ chức tín dụng đen.
          </p>
          <p>
            © {new Date().getFullYear()} Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank). Giấy phép thành lập và hoạt động số 0042/NH-GP do Thống đốc NHNN cấp.
          </p>
        </div>
      </div>
    </footer>
  );
};

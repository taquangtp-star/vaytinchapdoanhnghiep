import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, CheckCircle, ShieldCheck, ArrowRight, Info, AlertCircle, FileText, Landmark } from 'lucide-react';
import { LeadData } from '../types';

interface LoanCalculatorProps {
  onClaimQuote: (data: Partial<LeadData>) => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onClaimQuote }) => {
  // Inputs
  const [businessType, setBusinessType] = useState<'enterprise' | 'household' | 'ecommerce'>('enterprise');
  const [taxOrRevenueAmount, setTaxOrRevenueAmount] = useState<number>(30000000); // 30 million/year or /month
  const [redBookStatus, setRedBookStatus] = useState<'mortgaged_other_bank' | 'unencumbered' | 'no_red_book'>('mortgaged_other_bank');
  const [desiredAmount, setDesiredAmount] = useState<number>(1000000000); // 1 Billion
  const [loanTermMonths, setLoanTermMonths] = useState<number>(24);

  // Form states for Claim Quote
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Dynamic calculation logic based on inputs
  const calculation = useMemo(() => {
    let baseLimit = 500000000;
    let recommendedPackage = 'Gói Vốn Thuế Nâng Cao (Upper HHB - TAX)';
    let baseRate = 0.20; // 20%/year

    if (businessType === 'enterprise') {
      if (redBookStatus === 'mortgaged_other_bank' || redBookStatus === 'unencumbered') {
        // High limit up to 2 Billion
        baseLimit = Math.min(2000000000, Math.max(500000000, taxOrRevenueAmount * 25));
        recommendedPackage = 'Gói Vốn Thuế Nâng Cao (Upper HHB - TAX)';
        baseRate = 0.195;
      } else {
        baseLimit = Math.min(800000000, Math.max(200000000, taxOrRevenueAmount * 15));
        recommendedPackage = 'Gói Vốn Dòng Tiền Tài Khoản (Upper CASA)';
        baseRate = 0.21;
      }
    } else if (businessType === 'household') {
      if (redBookStatus === 'mortgaged_other_bank' || redBookStatus === 'unencumbered') {
        baseLimit = Math.min(1500000000, Math.max(300000000, taxOrRevenueAmount * 20));
        recommendedPackage = 'Gói Vốn Thuế Nâng Cao (Upper HHB - TAX)';
        baseRate = 0.21;
      } else {
        baseLimit = Math.min(500000000, Math.max(50000000, taxOrRevenueAmount * 3));
        recommendedPackage = 'Gói Vốn Thuế Siêu Tốc (Tax Plus)';
        baseRate = 0.22;
      }
    } else {
      // E-commerce
      baseLimit = Math.min(1000000000, Math.max(100000000, taxOrRevenueAmount * 2));
      recommendedPackage = 'Gói Vốn Chủ Shop E-Commerce';
      baseRate = 0.205;
    }

    // Round to millions
    const estimatedLimit = Math.round(baseLimit / 10000000) * 10000000;

    // Monthly payment calculation on reducing balance (month 1 max payment)
    const activeAmount = Math.min(desiredAmount, estimatedLimit);
    const monthlyPrincipal = activeAmount / loanTermMonths;
    const monthlyInterestMonth1 = (activeAmount * (baseRate / 12));
    const firstMonthPayment = Math.round(monthlyPrincipal + monthlyInterestMonth1);
    const lastMonthPayment = Math.round(monthlyPrincipal + (monthlyPrincipal * (baseRate / 12)));
    const averageMonthlyPayment = Math.round((firstMonthPayment + lastMonthPayment) / 2);

    return {
      estimatedLimit,
      firstMonthPayment,
      lastMonthPayment,
      averageMonthlyPayment,
      baseRate: (baseRate * 100).toFixed(1),
      recommendedPackage
    };
  }, [businessType, taxOrRevenueAmount, redBookStatus, desiredAmount, loanTermMonths]);

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ tên của bạn.');
      return;
    }
    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Vui lòng nhập số điện thoại hợp lệ (10 số).');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);

    onClaimQuote({
      fullName,
      phoneNumber: cleanPhone,
      businessType,
      capitalNeed: desiredAmount,
      redBookStatus,
      taxOrRevenue: `${taxOrRevenueAmount.toLocaleString('vi-VN')} VNĐ/năm`,
      location: 'Hà Nội / Bắc Ninh'
    });
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  return (
    <section id="tinh-han-muc" className="py-10 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="px-3.5 sm:px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Công Cụ Tính Hạn Mức Tự Động</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight leading-snug">
            Kiểm Tra Hạn Mức Cấp Vốn & Lịch Trả Nợ
          </h2>
          <p className="text-slate-300 text-xs mt-2 leading-relaxed">
            Chọn mô hình kinh doanh & tài sản để xem ngay hạn mức tối đa và số tiền trả góp hàng tháng.
          </p>
        </div>

        <div className="space-y-6 items-start">
          {/* Controls Box */}
          <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 shadow-xl space-y-4">
            {/* Step 1: Business Type */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  1. Loại hình kinh doanh
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  Bắt buộc
                </span>
              </div>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setBusinessType('enterprise')}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    businessType === 'enterprise'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm font-bold'
                      : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700 font-medium'
                  }`}
                >
                  <div className="text-xs font-bold">Doanh Nghiệp (TNHH, Cổ Phần)</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Chủ sở hữu &gt;= 30% vốn điều lệ</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBusinessType('household')}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    businessType === 'household'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm font-bold'
                      : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700 font-medium'
                  }`}
                >
                  <div className="text-xs font-bold">Hộ Kinh Doanh Cá Thể / Cửa Hàng</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Có giấy phép hoặc đóng thuế khoán/môn bài</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBusinessType('ecommerce')}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    businessType === 'ecommerce'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm font-bold'
                      : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700 font-medium'
                  }`}
                >
                  <div className="text-xs font-bold">Chủ Shop Online (E-Commerce)</div>
                  <div className="text-[10px] opacity-80 mt-0.5">Kinh doanh Shopee, TikTok Shop, Lazada</div>
                </button>
              </div>
            </div>

            {/* Step 2: Tax / Revenue input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  2. {businessType === 'enterprise' ? 'Thuế cả năm ước tính' : businessType === 'household' ? 'Thuế nộp hàng tháng' : 'Doanh thu/tháng'}
                </label>
                <span className="text-xs font-black text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {formatVND(taxOrRevenueAmount)}
                </span>
              </div>

              <input
                type="range"
                min={businessType === 'household' ? 1000000 : 10000000}
                max={businessType === 'household' ? 20000000 : 200000000}
                step={businessType === 'household' ? 500000 : 5000000}
                value={taxOrRevenueAmount}
                onChange={(e) => setTaxOrRevenueAmount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>{businessType === 'household' ? '1 tr' : '10 tr'}</span>
                <span>{businessType === 'household' ? '10 tr' : '100 tr'}</span>
                <span>{businessType === 'household' ? '20+ tr' : '200+ tr'}</span>
              </div>
            </div>

            {/* Step 3: Red Book Status (The Golden Differentiator) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                3. Tình trạng Sổ đỏ / Bất động sản
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setRedBookStatus('mortgaged_other_bank')}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    redBookStatus === 'mortgaged_other_bank'
                      ? 'bg-gradient-to-r from-emerald-800 to-teal-900 text-white border-emerald-400 ring-1 ring-emerald-400 font-bold'
                      : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold">ĐÃ THẾ CHẤP BANK KHÁC</span>
                    <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 shrink-0">
                      Duyệt đến 2 Tỷ
                    </span>
                  </div>
                  <div className="text-[10px] opacity-80">Sổ đang thế chấp VCB, BIDV, Tech... VPBank vẫn xem xét cấp thêm hạn mức</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRedBookStatus('unencumbered')}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    redBookStatus === 'unencumbered'
                      ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                      : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold">ĐÃ CÓ SỔ (CHƯA THẾ CHẤP)</span>
                    <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-emerald-400 text-slate-950 shrink-0">
                      Không Giữ Gốc
                    </span>
                  </div>
                  <div className="text-[10px] opacity-80">Chỉ chụp đối chiếu số hóa, không giữ bản gốc</div>
                </button>

                <button
                  type="button"
                  onClick={() => setRedBookStatus('no_red_book')}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    redBookStatus === 'no_red_book'
                      ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                      : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-bold">CHƯA CÓ SỔ ĐỎ / THUÊ MẶT BẰNG</span>
                    <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-blue-400 text-slate-950 shrink-0">
                      Tín Chấp 100%
                    </span>
                  </div>
                  <div className="text-[10px] opacity-80">Cấp vốn hoàn toàn dựa trên dòng tiền & hóa đơn thuế</div>
                </button>
              </div>
            </div>

            {/* Desired Capital & Loan Term */}
            <div className="space-y-3 pt-2 border-t border-slate-700">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-300">Nhu cầu vay mong muốn:</span>
                  <span className="text-xs font-black text-emerald-400">{formatVND(desiredAmount)}</span>
                </div>
                <input
                  type="range"
                  min="100000000"
                  max="2000000000"
                  step="50000000"
                  value={desiredAmount}
                  onChange={(e) => setDesiredAmount(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-300">Thời hạn vay vốn:</span>
                  <span className="text-xs font-black text-amber-300">{loanTermMonths} tháng ({Math.round(loanTermMonths / 12)} năm)</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[12, 24, 36].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setLoanTermMonths(m)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
                        loanTermMonths === m
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
                      }`}
                    >
                      {m} Tháng
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Calculation Result & Lead Capture */}
          <div className="w-full space-y-4">
            {/* Real-time Estimated Box */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-900/90 via-slate-800 to-slate-900 p-4 border border-emerald-500/50 shadow-xl relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-current text-yellow-300" />
                  Ước Tính Hạn Mức Tín Dụng
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 uppercase">
                  Khả quan
                </span>
              </div>

              {/* Big Estimated Limit */}
              <div className="mb-3">
                <div className="text-[11px] text-slate-300 font-medium">Hạn mức phê duyệt tối đa ước tính:</div>
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 mt-0.5">
                  {formatVND(calculation.estimatedLimit)}
                </div>
                <div className="text-[11px] text-emerald-200 mt-1 font-semibold">
                  Gói đề xuất: <span className="underline">{calculation.recommendedPackage}</span>
                </div>
              </div>

              {/* Monthly Repayment Breakdown (Dư nợ giảm dần) */}
              <div className="space-y-2 p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 gap-2">
                  <span className="text-slate-300 text-[11px]">Tháng đầu (Gốc + Lãi tối đa):</span>
                  <span className="font-black text-white text-xs shrink-0">{formatVND(calculation.firstMonthPayment)}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 gap-2">
                  <span className="text-slate-300 text-[11px]">Tháng cuối (Lãi thấp nhất):</span>
                  <span className="font-black text-emerald-300 text-xs shrink-0">{formatVND(calculation.lastMonthPayment)}</span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <span className="text-slate-300 text-[11px]">Lãi suất (Dư nợ giảm dần):</span>
                  <span className="font-bold text-amber-300 text-xs shrink-0">{calculation.baseRate}%/năm</span>
                </div>
              </div>

              {/* Red book notice */}
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-600/40 text-[11px] text-emerald-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Chính sách VPBank:</strong> Không giữ bản gốc Sổ đỏ. Chỉ đối chiếu bản sao, quy trình xử lý hồ sơ từ 24h - 48h làm việc.
                </span>
              </div>
            </div>

            {/* Quick Claim Lead Form */}
            <div className="rounded-2xl bg-white text-slate-900 p-4 shadow-lg border border-slate-200">
              <h3 className="text-sm font-black text-slate-900 mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Nhận Thông Báo Hạn Mức Chính Thức</span>
              </h3>
              <p className="text-[11px] text-slate-500 mb-3 leading-snug">
                Chuyên viên VPBank liên hệ xác thực & gửi kết quả duyệt hồ sơ:
              </p>

              {submitted ? (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle className="w-7 h-7 text-emerald-600 mx-auto" />
                  <div className="text-xs font-black text-emerald-900">Đăng Ký Thành Công!</div>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    Hồ sơ tra cứu đã chuyển đến Giám đốc quan hệ khách hàng SME VPBank Hà Nội - Bắc Ninh. Chúng tôi sẽ liên hệ lại trong ít phút!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleClaimSubmit} className="space-y-2.5">
                  {errorMsg && (
                    <div className="p-2 rounded-md bg-red-50 text-red-600 text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Họ và tên người đại diện"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 outline-hidden"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Số điện thoại nhận kết quả duyệt"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>GỬI HỒ SƠ NHẬN HẠN MỨC NGAY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-[10px] text-center text-slate-400">
                    * Miễn phí hoàn toàn 100% • Không qua môi giới trung gian
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

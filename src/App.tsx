import React, { useState } from 'react';
import { Header } from './components/Header';
import { TopVerticalVideo } from './components/TopVerticalVideo';
import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { ProductMatrixSection } from './components/ProductMatrixSection';
import { LoanCalculator } from './components/LoanCalculator';
import { ComparisonTable } from './components/ComparisonTable';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LeadFormAndFaqSection } from './components/LeadFormAndFaqSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { LeadSuccessModal } from './components/LeadSuccessModal';
import { QuickConsultationModal } from './components/QuickConsultationModal';
import { LeadData, LoanProduct } from './types';

export default function App() {
  const [activeLead, setActiveLead] = useState<Partial<LeadData> | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<LoanProduct | null>(null);

  // Handle lead submission from any source
  const handleLeadSubmit = (lead: Partial<LeadData>) => {
    setActiveLead(lead);
    setSuccessModalOpen(true);

    // Save lead to local history for resilience
    try {
      const existing = JSON.parse(localStorage.getItem('vpbank_leads') || '[]');
      existing.unshift({
        ...lead,
        id: `LEAD-${Date.now()}`,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('vpbank_leads', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  };

  // Scroll to lead form
  const scrollToForm = () => {
    const formEl = document.getElementById('dang-ky');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle product click
  const handleProductSelect = (product: LoanProduct) => {
    setSelectedProduct(product);
    setConsultModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 flex justify-center selection:bg-emerald-500 selection:text-white antialiased">
      {/* Outer Mobile Container: Strictly Mobile-Only on Desktop, centered with elegant frame & shadow */}
      <div className="w-full max-w-[440px] min-h-screen flex flex-col bg-white shadow-2xl relative border-x border-slate-700/60 overflow-x-clip">
        {/* 0. Header with VPBank SME brand, Hotlines, Zalo & Navigation */}
        <Header onOpenConsultationModal={() => setConsultModalOpen(true)} />

        <main className="flex-1 pb-16">
          {/* 0. TOP VERTICAL YOUTUBE VIDEO (Video dọc YouTube Shorts & Công cụ chèn video) */}
          <TopVerticalVideo onRegisterClick={scrollToForm} />

          {/* 1. HERO SECTION (Ấn tượng 3 giây đầu & Quick Lead Form) */}
          <HeroSection onQuickSubmit={handleLeadSubmit} />

          {/* 2. PAIN POINT SECTION (Đánh vào nỗi đau dòng tiền & Sổ đỏ bị giam) */}
          <PainPointsSection onSelectSolution={() => {
            const el = document.getElementById('giai-phap');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} />

          {/* 3. SOLUTION & PRODUCT MATRIX (4 Gói giải pháp vay vốn bình dân hóa) */}
          <ProductMatrixSection onSelectProduct={handleProductSelect} />

          {/* 4. INTERACTIVE CALCULATOR / ELIGIBILITY CHECKER (Công cụ tính thử hạn mức & Lịch trả nợ) */}
          <LoanCalculator onClaimQuote={handleLeadSubmit} />

          {/* 5. COMPARISON TABLE (So sánh sự vượt trội: Thế chấp truyền thống vs VPBank) */}
          <ComparisonTable onRegisterClick={scrollToForm} />

          {/* 6. STEP-BY-STEP PROCESS (Quy trình 3 bước siêu tốc trong 24 giờ) */}
          <ProcessSection onStartNow={scrollToForm} />

          {/* 7. SOCIAL PROOF & TESTIMONIALS (Bằng chứng thực tế khách hàng Hà Nội & Bắc Ninh) */}
          <TestimonialsSection />

          {/* 8. DETAILED LEAD FORM & ACCORDION FAQ (Form đăng ký & Giải đáp thắc mắc chi tiết) */}
          <LeadFormAndFaqSection
            initialData={activeLead || undefined}
            onSubmitLead={handleLeadSubmit}
          />
        </main>

        {/* 9. FOOTER & FLOATING ACTION BUTTONS */}
        <Footer />

        {/* Mobile Sticky Bar: Hotline 0359.622.268 & Zalo button */}
        <MobileStickyBar onOpenQuickForm={scrollToForm} />
      </div>

      {/* Conversion Confirmation Modal */}
      <LeadSuccessModal
        isOpen={successModalOpen}
        leadData={activeLead}
        onClose={() => setSuccessModalOpen(false)}
      />

      {/* Quick Consultation Modal when clicking a package */}
      <QuickConsultationModal
        isOpen={consultModalOpen}
        selectedProduct={selectedProduct}
        onClose={() => setConsultModalOpen(false)}
        onSubmit={handleLeadSubmit}
      />
    </div>
  );
}

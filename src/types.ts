export interface LeadData {
  id?: string;
  fullName: string;
  phoneNumber: string;
  businessType: 'enterprise' | 'household' | 'ecommerce';
  capitalNeed: number; // in VND
  redBookStatus: 'mortgaged_other_bank' | 'unencumbered' | 'no_red_book';
  taxOrRevenue?: string;
  monthlyRevenue?: number;
  location: string;
  urgentNote?: string;
  createdAt?: string;
}

export interface LoanProduct {
  id: string;
  title: string;
  badge: string;
  maxLimit: string;
  highlight: string;
  interestRate: string;
  condition: string;
  bulletPoints: string[];
  recommendedFor: string;
  popular?: boolean;
}

export interface CalculationResult {
  estimatedLimit: number;
  minMonthlyPayment: number;
  termMonths: number;
  interestRateEstimate: number;
  recommendedPackage: string;
  qualificationStatus: 'high' | 'medium' | 'eligible';
}

export interface TestimonialItem {
  id: string;
  name: string;
  title: string;
  businessName: string;
  location: string;
  amountApproved: string;
  disbursementTime: string;
  quote: string;
  documentUsed: string;
  avatarUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

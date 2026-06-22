export interface Candidate {
  id: string;
  name: string;
  role: string;
  email: string;
  score: number; // 0 to 100 based on AI/Tests
  matchStatus: 'excelente' | 'bom' | 'regular';
  status: 'triagem' | 'entrevista' | 'teste' | 'contratado' | 'rejeitado';
  avatarColor: string;
  avatarInitials: string;
  phone: string;
  location: string;
  appliedDate: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  candidatesCount: number;
  openSince: string;
  status: 'active' | 'closed';
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  logoUrl?: string;
}

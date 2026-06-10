export type ActiveTab = 'Home' | 'About' | 'Services' | 'Careers' | 'Testimonials' | 'Contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export interface CaregiverProfile {
  id: string;
  name: string;
  role: string;
  experience: string;
  imageUrl: string;
  bio: string;
  credentials: string[];
}

export interface FamilyResource {
  id: string;
  title: string;
  category: string;
  readTime: string;
  description: string;
  publishedAt: string;
  content: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  relationship: string;
  location: string;
  rating: number;
  quote: string;
  hasVideo?: boolean;
  videoDuration?: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface BookingSubmission {
  clientName: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate: string;
  preferredTime?: string;
  message?: string;
}

export interface CareerSubmission {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experienceYears: string;
  resumeText?: string;
  message?: string;
}

export interface MatchRecommendation {
  scoreNursing: number;
  scoreCompanion: number;
  scorePersonal: number;
  scoreDementia: number;
  recommendedService: string;
  explanation: string;
}

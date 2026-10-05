export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  deliverables: string[];
  technologies: string[];
  startingPrice: string;
  estimatedTimeline: string;
  highlightBadge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'ecommerce' | 'uiux' | 'cloud';
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
  }[];
  technologies: string[];
  imageUrl: string;
  featured?: boolean;
  liveUrl?: string;
  year: string;
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Database' | 'Cloud & DevOps' | 'AI & Tools';
  icon: string;
  description: string;
  level: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  avatarUrl: string;
  rating: number;
  content: string;
  projectType: string;
  location: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Pricing' | 'Process' | 'Security';
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  linkedin?: string;
  experience: string;
}

export interface EstimatorState {
  projectType: string;
  platform: string[];
  features: string[];
  designFidelity: string;
  timeline: string;
  maintenancePlan: string;
}

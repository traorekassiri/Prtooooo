export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  techniques: string[];
  materials: string[];
  imageUrl: string;
  date: string;
}

export interface Diploma {
  id: string;
  title: string;
  issuer: string;
  year: string;
  imageUrl: string;
  pdfUrl?: string;
  standard?: string;
}

export interface Attestation {
  id: string;
  title: string;
  company: string;
  description: string;
  year: string;
  fileUrl?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  url: string;
  videoPlatform?: 'mp4' | 'youtube';
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  date: string;
  approved: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SiteSettings {
  name: string;
  title: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  cvUrl: string;
  avatarUrl: string;
  aboutMe: string;
  values: string[];
  objectives: string;
  stats: {
    experienceYears: number;
    completedProjects: number;
    certificationsCount: number;
    satisfactionRate: number;
  };
}

export interface DB {
  projects: Project[];
  diplomas: Diploma[];
  attestations: Attestation[];
  media: MediaItem[];
  testimonials: Testimonial[];
  messages: Message[];
  settings: SiteSettings;
}

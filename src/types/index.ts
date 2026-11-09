export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  date: string;
  role: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'etc';
  proficiency?: number;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ExperienceProject {
  title: string;
  period: string;
  description: string;
  details: string[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  projects: ExperienceProject[];
}

export interface Achievement {
  title: string;
  description: string;
  metrics?: string;
  tags?: string[];
  accentColor?: 'primary' | 'secondary';
}

export interface MediaItem {
  title: string;
  category: string;
  period: string;
  thumbnail: string;
  href: string;
}

export interface PortfolioProject {
  title: string;
  description: string;
  period: string;
  highlights: string[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  appStoreUrl?: string;
}

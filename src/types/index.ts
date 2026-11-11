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

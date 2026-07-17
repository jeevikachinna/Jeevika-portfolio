export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  cgpaOrPercentage: string;
  duration: string;
  details?: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  challenges: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface InternshipItem {
  id: string;
  organization: string;
  role: string;
  duration: string;
  responsibilities: string[];
  skillsLearned: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  iconName: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

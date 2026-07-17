import {
  EducationItem,
  SkillCategory,
  ProjectItem,
  InternshipItem,
  CertificationItem,
  AchievementItem
} from './types';

export const personalInfo = {
  name: "JEEVIKA C",
  title: "Information Technology Student | Java & Full-Stack Developer",
  summary: "Motivated Information Technology student with a strong foundation in Java and Full-Stack Web Development. Hands-on experience through internships and academic projects, with a passion for learning new technologies and building user-friendly applications.",
  email: "jeevikachinnathambi2005@gmail.com",
  phone: "9043104201",
  location: "Pochampalli, Krishnagiri, Tamil Nadu",
  linkedin: "https://linkedin.com/in/jeevika-c-590050327",
  github: "https://github.com/jeevikachinna",
  leetcode: "https://leetcode.com/u/jeevikachinna", // standard placeholder handle based on github
  skillsSummary: ["Java", "Full-Stack Web Development", "React", "Node.js", "Spring Boot", "Databases", "AI Integration", "Generative AI"]
};

export const educationData: EducationItem[] = [
  {
    id: "edu-1",
    institution: "V.S.B Engineering College, Karur",
    degree: "B.Tech in Information Technology",
    cgpaOrPercentage: "CGPA: 8.74/10",
    duration: "2023 – Present",
    details: [
      "Acquiring strong skills in Computer Science & Information Technology fundamentals.",
      "Consistently maintaining an excellent academic record with 8.74 CGPA.",
      "Active participant in technical symposiums, coding challenges, and web development workshops."
    ]
  },
  {
    id: "edu-2",
    institution: "Sri Vijay Vidyalaya Matriculation Higher Secondary School",
    degree: "Class XII (HSC)",
    cgpaOrPercentage: "Percentage: 80%",
    duration: "Completed 2023",
    details: [
      "Focused on Mathematics, Physics, Chemistry, and Computer Science.",
      "Developed a keen interest in programming languages during high school studies."
    ]
  },
  {
    id: "edu-3",
    institution: "Sri Vijay Vidyalaya Matriculation Higher Secondary School",
    degree: "Class X (SSLC)",
    cgpaOrPercentage: "Percentage: 88%",
    duration: "Completed 2021",
    details: [
      "Achieved a high academic standing with 88% marks in state board exams."
    ]
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["Java", "Python"],
    icon: "Code"
  },
  {
    title: "Web Development",
    skills: ["HTML", "CSS", "React", "Node.js"],
    icon: "Globe"
  },
  {
    title: "Databases",
    skills: ["MySQL", "MongoDB"],
    icon: "Database"
  },
  {
    title: "UI/UX",
    skills: ["Responsive UI Design", "Tailwind CSS", "Bootstrap", "Wireframing"],
    icon: "Layout"
  },
  {
    title: "AI / ML Technologies",
    skills: ["Generative AI", "Prompt Engineering", "Machine Learning Fundamentals"],
    icon: "Cpu"
  },
  {
    title: "Tools & Frameworks",
    skills: ["Spring Boot", "REST APIs", "Git", "GitHub", "IndexedDB", "VS Code"],
    icon: "Wrench"
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Encrypted Content Management System with Conflict-Free Synchronization",
    description: "An offline-first encrypted Content Management System designed for highly secure document management, complete with offline capabilities and conflict resolution during network re-establishment.",
    technologies: ["React", "Spring Boot", "MongoDB", "AES-GCM", "IndexedDB", "REST APIs"],
    features: [
      "Offline-first capability allowing full document editing and management without active internet connection.",
      "Client-side AES-GCM encryption for end-to-end data security and cryptographic document protection.",
      "IndexedDB offline storage engine inside browser to save encrypted files locally.",
      "Secure conflict-free synchronization mechanism that auto-resolves changes with the MongoDB cloud database upon reconnecting."
    ],
    challenges: "Resolving synchronization conflicts between client-side offline modifications and concurrent server updates while ensuring cryptographic integrity was highly complex. Addressed this by implementing a vector-clock and last-write-wins merging strategy on encrypted payloads, validating hashes before updates.",
    githubUrl: "https://github.com/jeevikachinna/encrypted-cms",
    liveUrl: "https://github.com/jeevikachinna/encrypted-cms"
  },
  {
    id: "proj-2",
    title: "EventMate – AI Event Handler and Scheduler",
    description: "An AI-based event management and scheduler platform designed to simplify vendor management, venue booking, and schedule coordination through an intuitive, streamlined experience.",
    technologies: ["React", "HTML", "CSS", "Node.js", "AI Scheduling Algorithms"],
    features: [
      "Simplified interactive event booking, scheduling flows, and seamless slot management.",
      "Intelligent vendor management system for event equipment and caterer allocation.",
      "Fully responsive and mobile-friendly UI crafted from scratch with premium easy-to-use navigation."
    ],
    challenges: "Managing overlapping schedules and automated vendor constraints in real-time. Handled this by writing a custom scheduling validator algorithm on the frontend to detect overlaps and provide interactive real-time visual alerts to users before saving.",
    githubUrl: "https://github.com/jeevikachinna/event-mate",
    liveUrl: "https://github.com/jeevikachinna/event-mate"
  }
];

export const internshipsData: InternshipItem[] = [
  {
    id: "intern-1",
    organization: "Infosys",
    role: "Virtual Intern",
    duration: "11/2025",
    responsibilities: [
      "Successfully built and launched 'EventMate,' an intelligent, AI-based event handler and scheduler.",
      "Designed and structured responsive user interfaces with a heavy focus on user flow and accessible UI/UX controls.",
      "Integrated modular component patterns in React to achieve high maintainability and fluid states."
    ],
    skillsLearned: ["React", "HTML", "CSS", "UI/UX Flow Design", "AI Integration Concepts"]
  },
  {
    id: "intern-2",
    organization: "Forage",
    role: "Generative AI Intern",
    duration: "06/2025",
    responsibilities: [
      "Completed a Generative AI virtual internship, working on simulated professional projects and prompt optimization workflows.",
      "Studied real-world prompt design strategies, model safety, and fine-tuning mechanics.",
      "Applied LLM grounding patterns and API integration strategies to enhance productivity and solve user-centric problems."
    ],
    skillsLearned: ["Generative AI", "LLM Grounding", "Prompt Engineering", "AI Safety Protocols"]
  },
  {
    id: "intern-3",
    organization: "Brinary Spot Technologies",
    role: "Technical Trainee",
    duration: "Training Duration",
    responsibilities: [
      "Completed comprehensive structured training on programming fundamentals, software design patterns, and full-stack development.",
      "Worked on daily algorithmic coding problems to master Data Structures & Algorithms (DSA).",
      "Built clean, modular code scripts and static mini-websites to implement CSS grid layouts and responsive designs."
    ],
    skillsLearned: ["Python", "Web Development", "Data Structures", "Algorithms", "Problem Solving"]
  }
];

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Programming in Java",
    issuer: "NPTEL (National Programme on Technology Enhanced Learning)",
    year: "2025",
    iconName: "Award"
  },
  {
    id: "cert-2",
    title: "Introduction to Machine Learning",
    issuer: "NPTEL",
    year: "2025",
    iconName: "BrainCircuit"
  },
  {
    id: "cert-3",
    title: "Java & Python Foundation Certifications",
    issuer: "Infosys Springboard",
    year: "2024",
    iconName: "ShieldCheck"
  }
];

export const achievementsData: AchievementItem[] = [
  {
    id: "ach-1",
    title: "Excellent Academic Standing",
    description: "Maintained a strong 8.74/10 CGPA throughout college coursework in B.Tech Information Technology at V.S.B Engineering College.",
    iconName: "GraduationCap"
  },
  {
    id: "ach-2",
    title: "Completed Infosys Virtual Internship",
    description: "Successfully built and delivered an AI-driven EventMate application, earning praise for frontend layout and scheduling features.",
    iconName: "Compass"
  },
  {
    id: "ach-3",
    title: "Double NPTEL Certified",
    description: "Certified in both Advanced Java Programming and Machine Learning fundamentals through prestigious national-level exams in 2025.",
    iconName: "BadgeCheck"
  }
];

export const softSkills = [
  "Teamwork",
  "Leadership",
  "Problem Solving",
  "Communication",
  "Adaptability"
];

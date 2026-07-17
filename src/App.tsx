import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import CodingProfiles from './components/CodingProfiles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import AIAssistant from './components/AIAssistant';
import { ThemeType, themes } from './lib/theme';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [theme, setTheme] = useState<ThemeType>(() => {
    // 1. Detect user's system preference using 'prefers-color-scheme' media query as a default
    if (typeof window !== 'undefined' && window.matchMedia) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) return 'cosmic';
      const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (isLight) return 'chalk';
    }
    // 2. Fall back to local storage
    return (localStorage.getItem('portfolio-theme') as ThemeType) || 'chalk';
  });

  const handleSetTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  const handleOpenResume = () => {
    setIsResumeOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseResume = () => {
    setIsResumeOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleDownloadResumeText = () => {
    // We can reuse the text-blob generation logic directly or let the modal trigger it.
    // To make things seamless, if they click "Download Resume" in the Hero, we can trigger the plaintext download directly!
    // Let's create an elegant helper to download the resume plaintext.
    const personalInfoText = {
      name: "JEEVIKA C",
      summary: "Motivated Information Technology student with a strong foundation in Java and Full-Stack Web Development. Hands-on experience through internships and academic projects, with a passion for learning new technologies and building user-friendly applications.",
      email: "jeevikachinnathambi2005@gmail.com",
      phone: "9043104201",
      location: "Pochampalli, Krishnagiri, Tamil Nadu",
      linkedin: "https://linkedin.com/in/jeevika-c-590050327",
      github: "https://github.com/jeevikachinna"
    };

    let text = `==================================================\n`;
    text += `                     ${personalInfoText.name}\n`;
    text += `==================================================\n\n`;
    text += `Email: ${personalInfoText.email} | Phone: ${personalInfoText.phone}\n`;
    text += `Location: ${personalInfoText.location}\n`;
    text += `LinkedIn: ${personalInfoText.linkedin} | GitHub: ${personalInfoText.github}\n\n`;
    
    text += `--------------------------------------------------\n`;
    text += `PROFESSIONAL SUMMARY\n`;
    text += `--------------------------------------------------\n`;
    text += `${personalInfoText.summary}\n\n`;
    
    text += `--------------------------------------------------\n`;
    text += `EDUCATION\n`;
    text += `--------------------------------------------------\n`;
    text += `* B.Tech in Information Technology | V.S.B Engineering College, Karur\n`;
    text += `  CGPA: 8.74/10 | 2023 - Present\n`;
    text += `* Class XII (HSC) | Sri Vijay Vidyalaya Matriculation Higher Secondary School\n`;
    text += `  Percentage: 80% | Completed 2023\n`;
    text += `* Class X (SSLC) | Sri Vijay Vidyalaya Matriculation Higher Secondary School\n`;
    text += `  Percentage: 88% | Completed 2021\n\n`;
    
    text += `--------------------------------------------------\n`;
    text += `TECHNICAL SKILLS\n`;
    text += `--------------------------------------------------\n`;
    text += `* Programming: Java, Python\n`;
    text += `* Web Development: HTML, CSS, React, Node.js\n`;
    text += `* Databases: MySQL, MongoDB\n`;
    text += `* UI/UX: Responsive UI Design, Tailwind CSS, Bootstrap, Wireframing\n`;
    text += `* AI / ML: Generative AI, Prompt Engineering, Machine Learning Fundamentals\n`;
    text += `* Tools & Frameworks: Spring Boot, REST APIs, Git, GitHub, IndexedDB\n\n`;

    text += `--------------------------------------------------\n`;
    text += `INTERNSHIPS\n`;
    text += `--------------------------------------------------\n`;
    text += `* Virtual Intern | Infosys (11/2025)\n`;
    text += `  - Built "EventMate," an AI-based event handler and scheduler.\n`;
    text += `  - Designed and structured responsive user interfaces.\n`;
    text += `  - Integrated modular component patterns in React.\n`;
    text += `* Generative AI Intern | Forage (06/2025)\n`;
    text += `  - Completed a Generative AI virtual internship.\n`;
    text += `  - Studied prompt design, model safety, and fine-tuning.\n`;
    text += `* Technical Trainee | Brinary Spot Technologies\n`;
    text += `  - Completed training in Python, Web Development, and DSA.\n\n`;

    text += `--------------------------------------------------\n`;
    text += `PROJECTS\n`;
    text += `--------------------------------------------------\n`;
    text += `1. Encrypted Content Management System with Conflict-Free Synchronization\n`;
    text += `   Technologies: React, Spring Boot, MongoDB, AES-GCM, IndexedDB, REST APIs\n`;
    text += `   Features: Offline-first edit, AES-GCM end-to-end security, automatic sync on reconnect.\n`;
    text += `   Challenge Solved: Vector-clocks to resolve sync conflicts while preserving cryptographic integrity.\n\n`;
    text += `2. EventMate – AI Event Handler and Scheduler\n`;
    text += `   Technologies: React, HTML, CSS, Node.js\n`;
    text += `   Features: Event booking flows, vendor management system, fully responsive layout.\n`;
    text += `   Challenge Solved: Frontend custom scheduling overlap validator logic.\n\n`;

    text += `--------------------------------------------------\n`;
    text += `CERTIFICATIONS\n`;
    text += `--------------------------------------------------\n`;
    text += `* Programming in Java — NPTEL (2025)\n`;
    text += `* Introduction to Machine Learning — NPTEL (2025)\n`;
    text += `* Java & Python Foundation Certifications — Infosys Springboard\n\n`;

    text += `--------------------------------------------------\n`;
    text += `SOFT SKILLS\n`;
    text += `--------------------------------------------------\n`;
    text += `Teamwork, Leadership, Problem Solving, Communication, Adaptability\n\n`;

    text += `Generated from Jeevika's Digital Portfolio - ${new Date().toLocaleDateString()}`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JEEVIKA_C_RESUME.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const activeTheme = themes[theme];

  return (
    <div className={`min-h-screen ${activeTheme.bodyBg} ${activeTheme.textPrimary} transition-colors duration-300 flex flex-col font-sans`}>
      {/* Slim scroll progress bar at the top of the window */}
      <div id="scroll-progress-bar-container" className="fixed top-0 left-0 w-full h-[3px] z-[9999] bg-transparent pointer-events-none no-print">
        <div 
          id="scroll-progress-bar"
          className={`h-full ${activeTheme.accent} transition-all duration-75 ease-out`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Header Navbar */}
      <Header
        theme={theme}
        onThemeChange={handleSetTheme}
        onOpenResume={handleOpenResume}
      />

      {/* Main Content Layout */}
      <main className="flex-1">
        {/* Home / Hero Section */}
        <Hero
          theme={theme}
          onOpenResume={handleOpenResume}
          onDownloadResume={handleDownloadResumeText}
        />

        {/* About Section */}
        <About theme={theme} />

        {/* Education Section */}
        <Education theme={theme} />

        {/* Skills Section */}
        <Skills theme={theme} />

        {/* Projects Section */}
        <Projects theme={theme} />

        {/* Experience Section */}
        <Experience theme={theme} />

        {/* Certifications Section */}
        <Certifications theme={theme} />

        {/* Achievements Section */}
        <Achievements theme={theme} />

        {/* Coding Profiles Section */}
        <CodingProfiles theme={theme} />

        {/* Contact Section */}
        <Contact theme={theme} />
      </main>

      {/* Footer */}
      <Footer theme={theme} />

      {/* ATS-optimized Resume Sheet Overlay Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} theme={theme} />

      {/* AI Assistant Chatbot Panel */}
      <AIAssistant theme={theme} />
    </div>
  );
}

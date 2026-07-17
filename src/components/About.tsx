import { Terminal, Shield, Brain } from 'lucide-react';
import { personalInfo, softSkills } from '../data';
import { ThemeType, themes } from '../lib/theme';

export default function About({ theme }: { theme: ThemeType }) {
  const activeTheme = themes[theme];

  const focusAreas = [
    {
      title: "Java Development",
      description: "Deep understanding of object-oriented concepts, algorithms, and modular structure in Java. NPTEL-certified programmer with solid experience building secure server backends using Spring Boot.",
      icon: Terminal,
    },
    {
      title: "Full-Stack Engineering",
      description: "Proficient in React, Node.js, and MongoDB. Highly interested in robust offline-first designs, client-side encryption, IndexedDB caches, and REST-based data synchronization flows.",
      icon: Shield,
    },
    {
      title: "AI & Machine Learning",
      description: "Hands-on virtual internship experience in Generative AI. NPTEL-certified candidate in ML with interest in integrating AI-based scheduling algorithms and prompt workflow automations.",
      icon: Brain,
    }
  ];

  return (
    <section id="about" className={`py-24 border-b transition-all duration-300 ${activeTheme.sectionBgAlt} ${activeTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean Utility / Minimal with vertical indicator */}
        <div className="mb-16 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-5 rounded-full ${activeTheme.accent}`}></span>
            <p className={`text-xs uppercase font-mono font-bold tracking-widest ${activeTheme.accentText}`}>About Me</p>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight pl-3.5 border-l-2 ${activeTheme.border} ${activeTheme.textPrimary}`}>
            Professional Summary
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Summary Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight leading-snug ${activeTheme.textPrimary}`}>
              IT Student passionate about building scalable, secure, and smart web applications.
            </h3>
            <p className={`leading-relaxed text-sm sm:text-base ${activeTheme.textSecondary}`}>
              {personalInfo.summary}
            </p>
            <p className={`leading-relaxed text-sm sm:text-base ${activeTheme.textSecondary}`}>
              I am currently pursuing my <strong>B.Tech in Information Technology</strong> at V.S.B Engineering College. I specialize in backend logic with Java / Spring Boot and frontend experiences in React. My academic projects focus heavily on cryptographic end-to-end security, client-side storage engines, and algorithmic scheduling solutions.
            </p>
            
            {/* Soft Skills Section */}
            <div className="pt-4">
              <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 mb-3">Soft Skills & Attributes</h4>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 border rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.textSecondary} hover:${activeTheme.accentText} hover:border-slate-400`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Focus Areas Column */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-sm uppercase font-mono font-bold tracking-wider text-slate-400 mb-4">
              My Core Professional Focus
            </h3>
            <div className="space-y-4">
              {focusAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 border rounded-2xl transition-all duration-300 flex flex-col sm:flex-row gap-5 group hover:shadow-xs ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder}`}
                  >
                    <div className={`p-3 rounded-xl self-start border transition-all duration-300 ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.accentText} group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className={`text-base font-bold transition-colors ${activeTheme.textPrimary} group-hover:${theme === 'chalk' ? 'text-blue-600' : theme === 'cosmic' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                        {area.title}
                      </h4>
                      <p className={`text-xs sm:text-sm leading-relaxed ${activeTheme.textSecondary}`}>
                        {area.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

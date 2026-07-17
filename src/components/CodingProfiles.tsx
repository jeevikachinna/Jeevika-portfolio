import { Github, Linkedin, Code, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data';
import { ThemeType, themes } from '../lib/theme';

export default function CodingProfiles({ theme }: { theme: ThemeType }) {
  const activeTheme = themes[theme];

  const profiles = [
    {
      name: "LinkedIn",
      url: personalInfo.linkedin,
      handle: "jeevika-c-590050327",
      description: "Connect with me professionally, view my full background, and discuss internship or full-time placement opportunities.",
      icon: Linkedin,
      btnClass: "bg-[#0a66c2] hover:bg-[#095196] text-white"
    },
    {
      name: "GitHub",
      url: personalInfo.github,
      handle: "jeevikachinna",
      description: "Browse my code repositories, review my academic software development structures, and explore encryption algorithms or AI event schedulers.",
      icon: Github,
      btnClass: "bg-[#181717] hover:bg-[#2f2e2e] text-white"
    },
    {
      name: "LeetCode",
      url: personalInfo.leetcode,
      handle: "jeevikachinna",
      description: "Check my algorithmic progress, solved problems in Java & Python, and continuous computer science concept drills.",
      icon: Code,
      btnClass: "bg-[#f89f1b] hover:bg-[#df8605] text-white"
    }
  ];

  return (
    <section id="coding-profiles" className={`py-24 border-b transition-all duration-300 ${activeTheme.sectionBgAlt} ${activeTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean Utility with vertical indicator */}
        <div className="mb-16 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-5 rounded-full ${activeTheme.accent}`}></span>
            <p className={`text-xs uppercase font-mono font-bold tracking-widest ${activeTheme.accentText}`}>Profiles</p>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight pl-3.5 border-l-2 ${activeTheme.border} ${activeTheme.textPrimary}`}>
            Connect & Review My Work
          </h2>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {profiles.map((prof) => {
            const Icon = prof.icon;
            
            return (
              <div
                key={prof.name}
                className={`rounded-2xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between group hover:shadow-xs ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder}`}
              >
                <div className="space-y-4">
                  {/* Title & Icon Header */}
                  <div className="flex items-center justify-between">
                    <h3 className={`font-extrabold text-lg sm:text-xl ${activeTheme.textPrimary}`}>
                      {prof.name}
                    </h3>
                    <div className={`p-2 rounded-lg border transition-colors ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.accentText} group-hover:${theme === 'chalk' ? 'text-blue-600' : theme === 'cosmic' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Handle Name badge */}
                  <div className={`inline-block px-3 py-1 rounded-lg border text-xs font-mono font-bold ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.textPrimary}`}>
                    @{prof.handle}
                  </div>

                  {/* Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed text-justify ${activeTheme.textSecondary}`}>
                    {prof.description}
                  </p>
                </div>

                {/* Visit Button */}
                <div className="mt-8">
                  <a
                    id={`profile-btn-${prof.name.toLowerCase()}`}
                    href={prof.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-2.5 px-4 rounded-lg font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-3xs hover:shadow-2xs cursor-pointer ${prof.btnClass}`}
                  >
                    Visit Profile
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

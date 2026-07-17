import { Calendar, GraduationCap, School } from 'lucide-react';
import { educationData } from '../data';
import { ThemeType, themes } from '../lib/theme';

export default function Education({ theme }: { theme: ThemeType }) {
  const activeTheme = themes[theme];

  return (
    <section id="education" className={`py-24 border-b transition-all duration-300 ${activeTheme.sectionBg} ${activeTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean Utility with vertical indicator */}
        <div className="mb-16 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-5 rounded-full ${activeTheme.accent}`}></span>
            <p className={`text-xs uppercase font-mono font-bold tracking-widest ${activeTheme.accentText}`}>Education</p>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight pl-3.5 border-l-2 ${activeTheme.border} ${activeTheme.textPrimary}`}>
            Academic Background
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className={`absolute left-4 sm:left-1/2 top-2 bottom-2 w-[1px] -translate-x-1/2 hidden sm:block ${theme === 'chalk' ? 'bg-slate-200' : 'bg-slate-800'}`}></div>

          <div className="space-y-12 relative">
            {educationData.map((edu, index) => {
              const isEven = index % 2 === 0;
              const isCollege = edu.id === 'edu-1';
              
              return (
                <div
                  key={edu.id}
                  className={`flex flex-col sm:flex-row items-stretch ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } relative`}
                >
                  {/* Timeline Dot in Middle */}
                  <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center shadow-2xs transition-all duration-300 ${
                      isCollege 
                        ? (theme === 'chalk' ? 'bg-blue-600 text-white border-blue-500' : theme === 'cosmic' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-emerald-600 text-white border-emerald-500')
                        : `${activeTheme.cardBg} ${activeTheme.textSecondary} ${activeTheme.cardBorder}`
                    }`}>
                      {isCollege ? (
                        <GraduationCap className="w-4.5 h-4.5" />
                      ) : (
                        <School className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {/* Spacer Column for Desktop alignment */}
                  <div className="w-full sm:w-1/2 hidden sm:block"></div>

                  {/* Card Content Column */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8 relative">
                    <div className={`p-6 rounded-2xl border transition-all duration-300 group ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder}`}>
                      
                      {/* Timeline Duration */}
                      <div className={`flex items-center gap-1.5 text-xs font-mono font-semibold mb-2 ${activeTheme.accentText}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.duration}</span>
                      </div>

                      {/* Institution & Degree */}
                      <div className="space-y-1">
                        <h3 className={`text-lg font-bold transition-colors leading-snug ${activeTheme.textPrimary} group-hover:${theme === 'chalk' ? 'text-blue-600' : theme === 'cosmic' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                          {edu.degree}
                        </h3>
                        <p className={`font-medium text-xs sm:text-sm ${activeTheme.textSecondary}`}>
                          {edu.institution}
                        </p>
                      </div>

                      {/* Score Badge */}
                      <div className={`mt-3.5 inline-flex items-center px-2.5 py-1 border rounded-lg text-xs font-mono font-semibold ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.textPrimary}`}>
                        {edu.cgpaOrPercentage}
                      </div>

                      {/* Details / Bullets */}
                      {edu.details && edu.details.length > 0 && (
                        <ul className={`mt-4 space-y-2 border-t pt-3 text-xs sm:text-sm leading-relaxed list-disc list-inside ${activeTheme.border} ${activeTheme.textSecondary}`}>
                          {edu.details.map((detail, dIdx) => (
                            <li key={dIdx} className={`hover:${theme === 'chalk' ? 'text-slate-900' : 'text-white'} transition-colors`}>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

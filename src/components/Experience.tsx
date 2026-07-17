import { Calendar, Building, Sparkles, Code, CheckSquare } from 'lucide-react';
import { internshipsData } from '../data';
import { ThemeType, themes } from '../lib/theme';

export default function Experience({ theme }: { theme: ThemeType }) {
  const activeTheme = themes[theme];

  return (
    <section id="experience" className={`py-24 border-b transition-all duration-300 ${activeTheme.sectionBgAlt} ${activeTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean Utility with vertical indicator */}
        <div className="mb-16 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-5 rounded-full ${activeTheme.accent}`}></span>
            <p className={`text-xs uppercase font-mono font-bold tracking-widest ${activeTheme.accentText}`}>Work Experience</p>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight pl-3.5 border-l-2 ${activeTheme.border} ${activeTheme.textPrimary}`}>
            Internship Experiences
          </h2>
        </div>

        {/* Timeline Cards Grid */}
        <div className="max-w-5xl mx-auto space-y-8">
          {internshipsData.map((intern) => {
            const isInfosys = intern.organization.toLowerCase().includes('infosys');
            const isForage = intern.organization.toLowerCase().includes('forage');
            
            return (
              <div
                key={intern.id}
                className={`border rounded-2xl p-6 sm:p-8 transition-all duration-300 group flex flex-col md:flex-row gap-6 items-start hover:shadow-xs ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder}`}
              >
                {/* Organization Icon/Badge Column */}
                <div className="md:w-1/4 space-y-2.5 shrink-0">
                  <div className={`p-2.5 rounded-xl border inline-block ${
                    isInfosys 
                      ? 'bg-blue-50/50 border-blue-200 text-blue-700' 
                      : isForage 
                        ? 'bg-purple-50/50 border-purple-200 text-purple-700' 
                        : 'bg-emerald-50/50 border-emerald-200 text-emerald-700'
                  }`}>
                    {isInfosys ? (
                      <Building className="w-5 h-5" />
                    ) : isForage ? (
                      <Sparkles className="w-5 h-5" />
                    ) : (
                      <Code className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className={`text-base sm:text-lg font-bold transition-colors ${activeTheme.textPrimary} group-hover:${theme === 'chalk' ? 'text-blue-600' : theme === 'cosmic' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                      {intern.organization}
                    </h3>
                    <p className={`text-xs font-mono font-semibold uppercase tracking-wider ${activeTheme.accentText}`}>
                      {intern.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 font-semibold pt-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className={activeTheme.textSecondary}>{intern.duration}</span>
                  </div>
                </div>

                {/* Responsibilities and Skills learned */}
                <div className={`md:w-3/4 space-y-5 border-t md:border-t-0 md:border-l pt-5 md:pt-0 md:pl-6 w-full ${activeTheme.border}`}>
                  
                  {/* Responsibilities list */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-mono font-extrabold tracking-wider text-slate-400">
                      Key Deliverables & Responsibilities
                    </h4>
                    <ul className={`space-y-2.5 text-xs sm:text-sm leading-relaxed list-disc list-inside ${activeTheme.textSecondary}`}>
                      {intern.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className={`hover:${theme === 'chalk' ? 'text-slate-950' : 'text-white'} transition-colors`}>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills Learned badges */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs uppercase font-mono font-extrabold tracking-wider text-slate-400 flex items-center gap-1">
                      <CheckSquare className={`w-3.5 h-3.5 ${theme === 'chalk' ? 'text-blue-500' : theme === 'cosmic' ? 'text-indigo-400' : 'text-emerald-400'}`} />
                      Skills Acquired
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {intern.skillsLearned.map(skill => (
                        <span
                          key={skill}
                          className={`px-2.5 py-1 border font-mono font-semibold text-xs rounded-lg shadow-3xs hover:border-slate-400 transition-colors duration-200 ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.textSecondary}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

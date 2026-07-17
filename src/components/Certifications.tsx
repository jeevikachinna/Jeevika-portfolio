import { Award, Brain, CheckSquare, ShieldCheck } from 'lucide-react';
import { certificationsData } from '../data';
import { ThemeType, themes } from '../lib/theme';

export default function Certifications({ theme }: { theme: ThemeType }) {
  const activeTheme = themes[theme];

  const iconColor = (name: string) => {
    if (theme === 'chalk') {
      return name === 'Award' ? 'text-blue-600' : name === 'BrainCircuit' ? 'text-purple-600' : 'text-emerald-600';
    } else if (theme === 'cosmic') {
      return name === 'Award' ? 'text-indigo-400' : name === 'BrainCircuit' ? 'text-violet-400' : 'text-fuchsia-400';
    } else {
      return name === 'Award' ? 'text-emerald-400' : name === 'BrainCircuit' ? 'text-teal-400' : 'text-teal-300';
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className={`w-8 h-8 ${iconColor(iconName)}`} />;
      case 'BrainCircuit':
        return <Brain className={`w-8 h-8 ${iconColor(iconName)}`} />;
      case 'ShieldCheck':
        return <ShieldCheck className={`w-8 h-8 ${iconColor(iconName)}`} />;
      default:
        return <Award className={`w-8 h-8 ${iconColor(iconName)}`} />;
    }
  };

  return (
    <section id="certifications" className={`py-24 border-b transition-all duration-300 ${activeTheme.sectionBg} ${activeTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean Utility with vertical indicator */}
        <div className="mb-16 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-5 rounded-full ${activeTheme.accent}`}></span>
            <p className={`text-xs uppercase font-mono font-bold tracking-widest ${activeTheme.accentText}`}>Qualifications</p>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight pl-3.5 border-l-2 ${activeTheme.border} ${activeTheme.textPrimary}`}>
            Professional Certifications
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certificationsData.map((cert) => {
            return (
              <div
                key={cert.id}
                className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between group hover:shadow-xs ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder}`}
              >
                <div className="space-y-4">
                  {/* Icon Badge */}
                  <div className={`p-2.5 rounded-xl border w-fit transition-all duration-300 ${activeTheme.badgeBg} ${activeTheme.cardBorder}`}>
                    {getIcon(cert.iconName)}
                  </div>

                  {/* Title & Issuer */}
                  <div className="space-y-1">
                    <h3 className={`font-bold text-base sm:text-lg transition-colors leading-snug ${activeTheme.textPrimary} group-hover:${theme === 'chalk' ? 'text-blue-600' : theme === 'cosmic' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                      {cert.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-medium ${activeTheme.textSecondary}`}>
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Card Footer with Verification Year */}
                <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-semibold ${activeTheme.border} ${activeTheme.textSecondary}`}>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Verified</span>
                  </div>
                  <span className={`px-2 py-0.5 border rounded-md font-mono text-[10px] sm:text-xs ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.textPrimary}`}>
                    {cert.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

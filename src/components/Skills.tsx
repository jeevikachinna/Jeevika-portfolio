import { Code, Globe, Database, Layout, Cpu, Wrench, CheckCircle2 } from 'lucide-react';
import { skillsData } from '../data';
import { ThemeType, themes } from '../lib/theme';

export default function Skills({ theme }: { theme: ThemeType }) {
  const activeTheme = themes[theme];

  const iconColorClass = theme === 'chalk'
    ? 'text-blue-600'
    : theme === 'cosmic'
      ? 'text-indigo-400'
      : 'text-emerald-400';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Globe':
        return <Globe className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Database':
        return <Database className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Layout':
        return <Layout className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Cpu':
        return <Cpu className={`w-5 h-5 ${iconColorClass}`} />;
      case 'Wrench':
        return <Wrench className={`w-5 h-5 ${iconColorClass}`} />;
      default:
        return <Code className={`w-5 h-5 ${iconColorClass}`} />;
    }
  };

  return (
    <section id="skills" className={`py-24 border-b transition-all duration-300 ${activeTheme.sectionBgAlt} ${activeTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean Utility with vertical indicator */}
        <div className="mb-16 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-5 rounded-full ${activeTheme.accent}`}></span>
            <p className={`text-xs uppercase font-mono font-bold tracking-widest ${activeTheme.accentText}`}>Technical Skills</p>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight pl-3.5 border-l-2 ${activeTheme.border} ${activeTheme.textPrimary}`}>
            Expertise & Toolset
          </h2>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category) => {
            return (
              <div
                key={category.title}
                className={`rounded-2xl p-6 border transition-all duration-300 group ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder}`}
              >
                {/* Header of Category */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2 rounded-xl border ${activeTheme.badgeBg} ${activeTheme.cardBorder}`}>
                    {getIcon(category.icon)}
                  </div>
                  <h3 className={`font-bold text-base sm:text-lg transition-colors ${activeTheme.textPrimary} group-hover:${theme === 'chalk' ? 'text-blue-600' : theme === 'cosmic' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                    {category.title}
                  </h3>
                </div>

                {/* Badges / Items */}
                <div className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all duration-200 group/item shadow-3xs ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder}`}
                    >
                      <CheckCircle2 className={`w-4 h-4 shrink-0 transition-all ${iconColorClass} group-hover/item:scale-105`} />
                      <span className={`text-xs sm:text-sm font-semibold transition-colors ${activeTheme.textSecondary} group-hover/item:${theme === 'chalk' ? 'text-slate-900' : 'text-white'}`}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ATS Resume Alignment Info Alert */}
        <div className={`mt-12 p-5 border rounded-2xl flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto shadow-3xs ${activeTheme.alertBg} ${activeTheme.alertBorder}`}>
          <div className={`p-2.5 border rounded-xl shrink-0 ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.accentText}`}>
            <Cpu className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className={`font-bold text-xs sm:text-sm ${activeTheme.textPrimary}`}>Strictly Formatted for ATS Scanning</h4>
            <p className={`text-xs leading-relaxed ${activeTheme.textSecondary}`}>
              These industry-standard skills and keywords map precisely to technical placement queries used by modern applicant tracking systems (ATS) during recruitment campaigns.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

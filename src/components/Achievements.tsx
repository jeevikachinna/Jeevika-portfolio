import { Trophy, Compass, Award, Star } from 'lucide-react';
import { achievementsData } from '../data';
import { ThemeType, themes } from '../lib/theme';

export default function Achievements({ theme }: { theme: ThemeType }) {
  const activeTheme = themes[theme];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <Trophy className="w-8 h-8 text-amber-500" />;
      case 'Compass':
        return <Compass className="w-8 h-8 text-blue-500" />;
      case 'BadgeCheck':
        return <Award className="w-8 h-8 text-emerald-500" />;
      default:
        return <Star className="w-8 h-8 text-slate-500" />;
    }
  };

  return (
    <section id="achievements" className={`py-24 border-b transition-all duration-300 ${activeTheme.sectionBgAlt} ${activeTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean Utility with vertical indicator */}
        <div className="mb-16 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-5 rounded-full ${activeTheme.accent}`}></span>
            <p className={`text-xs uppercase font-mono font-bold tracking-widest ${activeTheme.accentText}`}>Milestones</p>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight pl-3.5 border-l-2 ${activeTheme.border} ${activeTheme.textPrimary}`}>
            Key Achievements
          </h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {achievementsData.map((ach) => {
            return (
              <div
                key={ach.id}
                className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col items-center text-center space-y-4 group hover:shadow-xs ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder}`}
              >
                {/* Icon Wrapper */}
                <div className={`p-3.5 rounded-xl border shadow-3xs group-hover:scale-105 transition-transform duration-300 ${activeTheme.badgeBg} ${activeTheme.cardBorder}`}>
                  {getIcon(ach.iconName)}
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  <h3 className={`font-extrabold text-base sm:text-lg transition-colors ${activeTheme.textPrimary} group-hover:${theme === 'chalk' ? 'text-blue-600' : theme === 'cosmic' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                    {ach.title}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${activeTheme.textSecondary}`}>
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

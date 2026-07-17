export type ThemeType = 'chalk' | 'cosmic' | 'emerald';

export interface ThemeStyles {
  bodyBg: string;
  sectionBg: string;
  sectionBgAlt: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  accent: string;
  accentBg: string;
  accentText: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  shadow: string;
  badgeBg: string;
  badgeText: string;
  headingUnderline: string;
  buttonPrimary: string;
  buttonSecondary: string;
  alertBg: string;
  alertText: string;
  alertBorder: string;
  glowEffect?: string;
  gridOpacity?: string;
}

export const themes: Record<ThemeType, ThemeStyles> = {
  chalk: {
    bodyBg: 'bg-[#FAF9F6]',
    sectionBg: 'bg-[#FAF9F6]',
    sectionBgAlt: 'bg-white',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-650',
    textMuted: 'text-slate-400',
    border: 'border-slate-200',
    accent: 'bg-blue-600',
    accentBg: 'bg-blue-50/50',
    accentText: 'text-blue-700',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-200',
    cardHoverBorder: 'hover:border-blue-600/80',
    shadow: 'shadow-3xs',
    badgeBg: 'bg-slate-50',
    badgeText: 'text-slate-600',
    headingUnderline: 'bg-blue-600',
    buttonPrimary: 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900',
    buttonSecondary: 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200',
    alertBg: 'bg-blue-50/20',
    alertText: 'text-blue-950',
    alertBorder: 'border-blue-200/50',
    glowEffect: 'bg-blue-200/20',
    gridOpacity: 'opacity-35',
  },
  cosmic: {
    bodyBg: 'bg-[#0B0F19]',
    sectionBg: 'bg-[#0B0F19]',
    sectionBgAlt: 'bg-[#0f172a]',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-500',
    border: 'border-slate-800',
    accent: 'bg-indigo-600',
    accentBg: 'bg-indigo-950/40',
    accentText: 'text-indigo-400',
    cardBg: 'bg-[#0f172a]/70 backdrop-blur-md',
    cardBorder: 'border-slate-800/80',
    cardHoverBorder: 'hover:border-indigo-500/80',
    shadow: 'shadow-md shadow-indigo-950/20',
    badgeBg: 'bg-slate-900/80',
    badgeText: 'text-slate-300',
    headingUnderline: 'bg-indigo-500',
    buttonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600',
    buttonSecondary: 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700',
    alertBg: 'bg-indigo-950/30',
    alertText: 'text-indigo-200',
    alertBorder: 'border-indigo-900/40',
    glowEffect: 'bg-indigo-500/10',
    gridOpacity: 'opacity-15',
  },
  emerald: {
    bodyBg: 'bg-[#02241C]',
    sectionBg: 'bg-[#02241C]',
    sectionBgAlt: 'bg-[#043E31]',
    textPrimary: 'text-emerald-50',
    textSecondary: 'text-emerald-200/90',
    textMuted: 'text-emerald-400/50',
    border: 'border-emerald-800/40',
    accent: 'bg-emerald-500',
    accentBg: 'bg-emerald-950/40',
    accentText: 'text-emerald-300',
    cardBg: 'bg-[#043E31]/70 backdrop-blur-md',
    cardBorder: 'border-emerald-800/50',
    cardHoverBorder: 'hover:border-emerald-400/80',
    shadow: 'shadow-md shadow-emerald-950/30',
    badgeBg: 'bg-[#022c22]/80',
    badgeText: 'text-emerald-300',
    headingUnderline: 'bg-emerald-400',
    buttonPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600',
    buttonSecondary: 'bg-[#022c22] hover:bg-[#02372b] text-emerald-100 border-emerald-800/60',
    alertBg: 'bg-emerald-950/20',
    alertText: 'text-emerald-100',
    alertBorder: 'border-emerald-800/30',
    glowEffect: 'bg-emerald-400/10',
    gridOpacity: 'opacity-10',
  }
};

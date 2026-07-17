import { Mail, ArrowDown, FileText, Download } from 'lucide-react';
import { personalInfo } from '../data';
import { ThemeType, themes } from '../lib/theme';

const profilePic = "/src/assets/images/profile_placeholder_1784311152877.jpg";

interface HeroProps {
  theme: ThemeType;
  onOpenResume: () => void;
  onDownloadResume: () => void;
}

export default function Hero({ theme, onOpenResume, onDownloadResume }: HeroProps) {
  const activeTheme = themes[theme];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = aboutSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Theme-specific derivations for Hero
  const sectionBg = theme === 'chalk'
    ? 'bg-radial from-blue-50/30 via-[#FAF9F6] to-[#FAF9F6]/60'
    : theme === 'cosmic'
      ? 'bg-radial from-indigo-950/25 via-[#0B0F19] to-[#0B0F19]/60'
      : 'bg-radial from-emerald-950/25 via-[#02241C] to-[#02241C]/60';

  const gridLineColor = theme === 'chalk'
    ? 'bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]'
    : theme === 'cosmic'
      ? 'bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]'
      : 'bg-[linear-gradient(to_right,#064e3b/30_1px,transparent_1px),linear-gradient(to_bottom,#064e3b/30_1px,transparent_1px)]';

  const glowOrb1 = theme === 'chalk' ? 'bg-blue-200/20' : theme === 'cosmic' ? 'bg-indigo-500/10' : 'bg-emerald-500/10';
  const glowOrb2 = theme === 'chalk' ? 'bg-indigo-200/20' : theme === 'cosmic' ? 'bg-violet-500/10' : 'bg-teal-500/10';

  const badgeClasses = theme === 'chalk'
    ? 'bg-blue-50/50 border border-blue-200/60 text-blue-700'
    : theme === 'cosmic'
      ? 'bg-indigo-950/40 border border-indigo-900/60 text-indigo-400'
      : 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-300';

  const accentColorText = theme === 'chalk'
    ? 'text-blue-600'
    : theme === 'cosmic'
      ? 'text-indigo-400'
      : 'text-emerald-400';

  const dotColor = theme === 'chalk' ? 'bg-blue-600' : theme === 'cosmic' ? 'bg-indigo-500' : 'bg-emerald-400';

  return (
    <section
      id="home"
      className={`relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden transition-all duration-300 ${sectionBg}`}
    >
      {/* Decorative Grid Background */}
      <div className={`absolute inset-0 z-0 ${gridLineColor} bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] ${activeTheme.gridOpacity}`}></div>

      {/* Decorative Blur Orbs */}
      <div className={`absolute top-20 left-10 sm:left-1/4 w-72 h-72 rounded-full blur-3xl -z-10 ${glowOrb1}`}></div>
      <div className={`absolute bottom-20 right-10 sm:right-1/4 w-80 h-80 rounded-full blur-3xl -z-10 ${glowOrb2}`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none ${activeTheme.textPrimary}`}>
                Hi, I'm <span className={`${accentColorText} relative inline-block`}>{personalInfo.name}</span>
              </h1>
              <p className={`text-lg sm:text-xl font-bold font-sans tracking-tight ${theme === 'chalk' ? 'text-slate-700' : 'text-slate-300'}`}>
                {personalInfo.title}
              </p>
            </div>

            {/* Short Bio */}
            <p className={`max-w-xl mx-auto lg:mx-0 leading-relaxed text-xs sm:text-sm text-justify ${activeTheme.textSecondary}`}>
              {personalInfo.summary} I design, encrypt, and orchestrate modern full-stack systems focusing on high performance, reliable offline access, and intuitive UI layout.
            </p>

            {/* Quick Badges / Micro Details */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-2">
              {personalInfo.skillsSummary.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className={`px-2.5 py-1 border rounded-lg text-xs font-mono font-semibold shadow-3xs ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.textSecondary}`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4">
              <button
                id="hero-view-resume-btn"
                onClick={onOpenResume}
                className={`w-full sm:w-auto px-5 py-3 font-mono font-bold text-xs uppercase tracking-wider rounded-lg shadow-3xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                  theme === 'chalk' ? 'bg-blue-600 hover:bg-blue-700 text-white' : theme === 'cosmic' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                View Resume
              </button>

              <button
                id="hero-download-resume-btn"
                onClick={onDownloadResume}
                className={`w-full sm:w-auto px-5 py-3 font-mono font-bold text-xs uppercase tracking-wider rounded-lg border shadow-3xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${activeTheme.buttonSecondary}`}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>

              <button
                id="hero-contact-btn"
                onClick={scrollToContact}
                className={`w-full sm:w-auto px-5 py-3 font-mono font-bold text-xs uppercase tracking-wider rounded-lg shadow-3xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${activeTheme.buttonPrimary}`}
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </button>
            </div>
          </div>

          {/* Hero Right: Profile Photo */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative group">
              {/* Subtle outer glow on hover */}
              <div className={`absolute -inset-1 rounded-full opacity-20 group-hover:opacity-35 blur-md transition duration-500 bg-gradient-to-r ${
                theme === 'chalk' ? 'from-blue-600 to-indigo-600' : theme === 'cosmic' ? 'from-indigo-500 to-purple-600' : 'from-emerald-500 to-teal-500'
              }`}></div>
              
              {/* Photo Box */}
              <div className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 z-10 shadow-md ${activeTheme.cardBorder} ${activeTheme.cardBg}`}>
                <img
                  src={profilePic}
                  alt={`${personalInfo.name} Portrait`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Float Cards */}
              <div className={`absolute -bottom-2 -left-6 p-3 rounded-xl border flex items-center gap-2.5 z-20 hover:scale-105 transition-transform ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
                <div className={`px-2 py-1 rounded-lg border font-mono font-extrabold text-xs ${activeTheme.accentBg} ${activeTheme.accentText} ${activeTheme.cardBorder}`}>
                  8.74
                </div>
                <div>
                  <p className="text-[9px] uppercase font-mono font-bold tracking-wider text-slate-400 leading-none">B.Tech IT</p>
                  <p className={`text-xs font-bold mt-0.5 ${activeTheme.textPrimary}`}>Current CGPA</p>
                </div>
              </div>

              <div className={`absolute -top-4 -right-6 p-3 rounded-xl border flex items-center gap-2.5 z-20 hover:scale-105 transition-transform ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
                <div className={`px-2 py-1 rounded-lg border font-mono font-extrabold text-xs ${activeTheme.accentBg} ${activeTheme.accentText} ${activeTheme.cardBorder}`}>
                  3+
                </div>
                <div>
                  <p className="text-[9px] uppercase font-mono font-bold tracking-wider text-slate-400 leading-none">Completed</p>
                  <p className={`text-xs font-bold mt-0.5 ${activeTheme.textPrimary}`}>Internships</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center pt-16">
          <button
            id="hero-scroll-down-btn"
            onClick={scrollToAbout}
            className={`p-2 rounded-full border transition-all duration-300 focus:outline-none cursor-pointer ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.textSecondary} hover:${activeTheme.accentText}`}
            aria-label="Scroll to About Me"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}

import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data';
import { ThemeType, themes } from '../lib/theme';

export default function Footer({ theme }: { theme: ThemeType }) {
  const activeTheme = themes[theme];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer id="site-footer" className={`border-t py-16 relative transition-all duration-300 ${activeTheme.sectionBgAlt} ${activeTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b ${activeTheme.border}`}>
          
          {/* Logo & Thank You */}
          <div className="md:col-span-6 space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className={`w-2.5 h-2.5 rounded-xs ${theme === 'chalk' ? 'bg-blue-600' : theme === 'cosmic' ? 'bg-indigo-500' : 'bg-emerald-400'}`}></span>
              <h3 className={`font-sans font-bold text-base tracking-tight ${activeTheme.textPrimary}`}>
                {personalInfo.name}
              </h3>
            </div>
            <p className={`text-xs sm:text-sm max-w-sm mx-auto md:mx-0 leading-relaxed text-justify ${activeTheme.textSecondary}`}>
              Thank you for taking the time to explore my professional portfolio. I am dedicated to driving value through robust Java designs, full-stack synchronizations, and collaborative solutions.
            </p>
          </div>

          {/* Socials Link List */}
          <div className="md:col-span-6 flex flex-col items-center md:items-end space-y-4">
            <div className="flex gap-2.5">
              <a
                id="footer-social-linkedin"
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-lg border transition-all shadow-3xs cursor-pointer ${activeTheme.buttonSecondary}`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                id="footer-social-github"
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className={`p-2.5 rounded-lg border transition-all shadow-3xs cursor-pointer ${activeTheme.buttonSecondary}`}
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                id="footer-social-mail"
                href={`mailto:${personalInfo.email}`}
                className={`p-2.5 rounded-lg border transition-all shadow-3xs cursor-pointer ${activeTheme.buttonSecondary}`}
                aria-label="Email Address"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[10px] uppercase tracking-widest font-mono font-bold text-slate-400">
              Krishna Giri, Tamil Nadu, India
            </p>
          </div>

        </div>

        {/* Lower footer row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[11px] sm:text-xs font-mono font-bold text-slate-400">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved. Created for Campus Placements.
          </p>
          
          {/* Scroll to Top */}
          <button
            id="footer-scroll-top-btn"
            onClick={scrollToTop}
            className={`group flex items-center gap-1.5 px-3 py-1.5 border text-xs font-mono font-bold transition-all cursor-pointer shadow-3xs rounded-lg ${activeTheme.buttonSecondary}`}
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-slate-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}

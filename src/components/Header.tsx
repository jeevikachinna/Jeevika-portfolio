import React, { useState, useEffect } from 'react';
import { Menu, X, User, Code, GraduationCap, Briefcase, Award, Send, Palette } from 'lucide-react';
import { personalInfo } from '../data';
import { ThemeType, themes } from '../lib/theme';

export default function Header({ 
  theme, 
  onThemeChange, 
  onOpenResume 
}: { 
  theme: ThemeType; 
  onThemeChange: (t: ThemeType) => void; 
  onOpenResume: () => void; 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'hero', icon: User },
    { label: 'About', href: '#about', id: 'about', icon: User },
    { label: 'Education', href: '#education', id: 'education', icon: GraduationCap },
    { label: 'Skills', href: '#skills', id: 'skills', icon: Code },
    { label: 'Projects', href: '#projects', id: 'projects', icon: Code },
    { label: 'Experience', href: '#experience', id: 'experience', icon: Briefcase },
    { label: 'Certifications', href: '#certifications', id: 'certifications', icon: Award },
    { label: 'Contact', href: '#contact', id: 'contact', icon: Send },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple intersection observer behavior on scroll
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const activeTheme = themes[theme];
  const bgScrolled = theme === 'chalk' 
    ? 'bg-[#FAF9F6]/90 backdrop-blur-md border-b border-slate-200 shadow-3xs' 
    : theme === 'cosmic' 
      ? 'bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 shadow-md' 
      : 'bg-[#02241C]/90 backdrop-blur-md border-b border-emerald-800/40 shadow-md';

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? bgScrolled + ' py-3.5' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            id="nav-logo"
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex flex-col focus:outline-none"
          >
            <span className={`font-sans font-bold text-base sm:text-lg tracking-tight flex items-center gap-1.5 ${activeTheme.textPrimary}`}>
              <span className={`w-2.5 h-2.5 rounded-xs ${activeTheme.accent}`}></span>
              {personalInfo.name}
            </span>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'chalk' ? 'text-slate-500' : 'text-slate-400/60'}`}>
              Campus Portfolio
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium tracking-wide transition-all duration-200 border ${
                    isActive
                      ? `${activeTheme.accentText} ${activeTheme.accentBg} ${activeTheme.border} font-semibold`
                      : `${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:bg-slate-50/5 border-transparent`
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Tactile Theme Select Group */}
            <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border ml-3 mr-1 ${activeTheme.border} bg-slate-50/5`}>
              <Palette className={`w-3.5 h-3.5 mr-1 ${theme === 'chalk' ? 'text-slate-400' : 'text-slate-500'}`} />
              <button
                onClick={() => onThemeChange('chalk')}
                className={`w-3.5 h-3.5 rounded-full bg-[#FAF9F6] border cursor-pointer transition-all ${
                  theme === 'chalk' ? 'border-blue-500 ring-2 ring-blue-500/20 scale-110' : 'border-slate-300'
                }`}
                title="Nordic Chalk"
              />
              <button
                onClick={() => onThemeChange('cosmic')}
                className={`w-3.5 h-3.5 rounded-full bg-[#0B0F19] border cursor-pointer transition-all ${
                  theme === 'cosmic' ? 'border-indigo-500 ring-2 ring-indigo-500/20 scale-110' : 'border-slate-700'
                }`}
                title="Cosmic Dark"
              />
              <button
                onClick={() => onThemeChange('emerald')}
                className={`w-3.5 h-3.5 rounded-full bg-[#02241C] border cursor-pointer transition-all ${
                  theme === 'emerald' ? 'border-emerald-400 ring-2 ring-emerald-400/20 scale-110' : 'border-emerald-800'
                }`}
                title="Emerald Glass"
              />
            </div>
            
            <button
              id="header-resume-btn"
              onClick={onOpenResume}
              className={`ml-2 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeTheme.buttonPrimary}`}
            >
              Resume
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick Palette for Mobile */}
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border ${activeTheme.border} bg-slate-50/5`}>
              <button
                onClick={() => onThemeChange(theme === 'chalk' ? 'cosmic' : theme === 'cosmic' ? 'emerald' : 'chalk')}
                className="p-1 text-slate-400 hover:text-slate-200 flex items-center justify-center cursor-pointer"
                title="Cycle Palette"
              >
                <Palette className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              id="header-resume-btn-mobile"
              onClick={onOpenResume}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md cursor-pointer ${activeTheme.buttonPrimary}`}
            >
              Resume
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1.5 rounded-md focus:outline-none ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:bg-slate-50/10`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-nav-drawer" 
          className={`lg:hidden absolute top-full left-0 right-0 border-b py-3 px-4 space-y-1 shadow-md ${activeTheme.cardBg} ${activeTheme.border}`}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                id={`mobile-nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`block px-4 py-2 rounded-md text-xs font-mono font-medium tracking-wide transition-colors ${
                  isActive
                    ? `${activeTheme.accentText} ${activeTheme.accentBg} border-l-2 ${theme === 'emerald' ? 'border-emerald-400' : theme === 'cosmic' ? 'border-indigo-500' : 'border-blue-500'} font-semibold pl-3`
                    : `${activeTheme.textSecondary} hover:${activeTheme.textPrimary} hover:bg-slate-50/5`
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

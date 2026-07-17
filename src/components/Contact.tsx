import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Linkedin, Github } from 'lucide-react';
import { personalInfo } from '../data';
import { ThemeType, themes } from '../lib/theme';

export default function Contact({ theme }: { theme: ThemeType }) {
  const activeTheme = themes[theme];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    // Simulate sending message
    setTimeout(() => {
      try {
        // Store in localStorage so the recruiter's message is preserved
        const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        const newMessage = {
          ...formData,
          id: Date.now(),
          date: new Date().toISOString()
        };
        existingMessages.push(newMessage);
        localStorage.setItem('portfolio_messages', JSON.stringify(existingMessages));

        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        setErrorMessage('Failed to submit message. Please try again.');
        setStatus('error');
      }
    }, 1200);
  };

  const inputBgClass = theme === 'chalk'
    ? 'bg-slate-50 focus:bg-white border-slate-200 focus:border-blue-600 text-slate-850 placeholder:text-slate-400'
    : theme === 'cosmic'
      ? 'bg-[#060913] focus:bg-[#0B0F19] border-slate-800 focus:border-indigo-500 text-white placeholder:text-slate-550'
      : 'bg-[#011410] focus:bg-[#02241C] border-emerald-900/60 focus:border-emerald-500 text-emerald-100 placeholder:text-emerald-800';

  const accentButtonBg = theme === 'chalk'
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : theme === 'cosmic'
      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
      : 'bg-emerald-600 hover:bg-emerald-700 text-white';

  return (
    <section id="contact" className={`py-24 transition-all duration-300 ${activeTheme.sectionBg} ${activeTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean Utility with vertical indicator */}
        <div className="mb-16 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-5 rounded-full ${activeTheme.accent}`}></span>
            <p className={`text-xs uppercase font-mono font-bold tracking-widest ${activeTheme.accentText}`}>Contact</p>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight pl-3.5 border-l-2 ${activeTheme.border} ${activeTheme.textPrimary}`}>
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Contact Details Column */}
          <div className={`lg:col-span-5 border rounded-2xl p-6 sm:p-8 flex flex-col justify-between ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${activeTheme.textPrimary}`}>
                  Let's Discuss Placement Opportunities!
                </h3>
                <p className={`text-xs sm:text-sm mt-2.5 leading-relaxed text-justify ${activeTheme.textSecondary}`}>
                  I am actively seeking B.Tech IT internships and full-time role opportunities for the 2026 / 2027 recruitment drives. Feel free to reach out via phone, email, or by filling out the form.
                </p>
              </div>

              {/* Contact Information Lists */}
              <div className="space-y-4">
                {/* Email */}
                <div className={`flex items-center gap-4 p-3 border shadow-3xs rounded-xl ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
                  <div className={`p-2.5 rounded-lg ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.accentText}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-450">Email Me</p>
                    <a
                      id="contact-email-link"
                      href={`mailto:${personalInfo.email}`}
                      className={`text-sm font-semibold transition-colors ${activeTheme.textPrimary} hover:${activeTheme.accentText}`}
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className={`flex items-center gap-4 p-3 border shadow-3xs rounded-xl ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
                  <div className={`p-2.5 rounded-lg ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.accentText}`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-450">Call Me</p>
                    <a
                      id="contact-phone-link"
                      href={`tel:${personalInfo.phone}`}
                      className={`text-sm font-semibold transition-colors ${activeTheme.textPrimary} hover:${activeTheme.accentText}`}
                    >
                      +91 {personalInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className={`flex items-center gap-4 p-3 border shadow-3xs rounded-xl ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
                  <div className={`p-2.5 rounded-lg ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.accentText}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-450">Location</p>
                    <p className={`text-sm font-semibold ${activeTheme.textPrimary}`}>
                      {personalInfo.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick social card footer */}
            <div className={`border-t pt-6 mt-8 ${activeTheme.border}`}>
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">Connect on Social Networks</h4>
              <div className="flex gap-2.5">
                <a
                  id="contact-social-linkedin"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2.5 border rounded-lg transition-all shadow-3xs cursor-pointer ${activeTheme.buttonSecondary}`}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a
                  id="contact-social-github"
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2.5 border rounded-lg transition-all shadow-3xs cursor-pointer ${activeTheme.buttonSecondary}`}
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className={`lg:col-span-7 border rounded-2xl p-6 sm:p-8 ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className={`p-3.5 rounded-full border ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.accentText}`}>
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className={`text-xl font-extrabold tracking-tight ${activeTheme.textPrimary}`}>Message Received!</h3>
                  <p className={`text-xs sm:text-sm max-w-sm mx-auto leading-relaxed ${activeTheme.textSecondary}`}>
                    Thank you so much for reaching out, Jeevika will get back to you as soon as possible. Recruiter log entries saved locally.
                  </p>
                </div>
                <button
                  id="contact-reset-btn"
                  onClick={() => setStatus('idle')}
                  className={`px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border ${activeTheme.buttonSecondary}`}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm font-medium outline-hidden transition-all ${inputBgClass}`}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm font-medium outline-hidden transition-all ${inputBgClass}`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="form-subject" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Subject
                  </label>
                  <input
                    id="form-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Campus Recruitment Opportunity"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm font-medium outline-hidden transition-all ${inputBgClass}`}
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="form-message" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Your Message <span className="text-rose-500">*</span>
                    </label>
                  <textarea
                    id="form-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe the placement criteria, internship timeline, or any general question..."
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm font-medium outline-hidden transition-all resize-none ${inputBgClass}`}
                  />
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <div className={`p-4 border rounded-lg flex items-center gap-2.5 text-xs font-semibold ${activeTheme.alertBg} ${activeTheme.alertBorder} text-rose-500`}>
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full py-3 disabled:opacity-60 font-mono font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${accentButtonBg}`}
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

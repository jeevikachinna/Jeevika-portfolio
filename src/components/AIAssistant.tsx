import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Cpu, Check, Briefcase, GraduationCap, Code2, HeartHandshake, Sparkles } from 'lucide-react';
import { ThemeType, themes } from '../lib/theme';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isWidget?: boolean;
  widgetType?: 'matcher' | 'skills' | 'contact';
}

interface AIAssistantProps {
  theme: ThemeType;
}

export default function AIAssistant({ theme }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi! I am Jeevika's Digital Placement Assistant. 🌟 I'm here to help you review her qualifications, projects, and see if she is the perfect match for your team. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Job Matcher State
  const [jobTitle, setJobTitle] = useState('');
  const [jobSkills, setJobSkills] = useState('');
  const [matchResult, setMatchResult] = useState<{
    score: number;
    matchLevel: string;
    strengths: string[];
    gapAnalysis: string;
    recommendation: string;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeTheme = themes[theme];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking/typing
    setTimeout(() => {
      const response = generateLocalResponse(text);
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'assistant',
        text: response.text,
        timestamp: new Date(),
        isWidget: response.isWidget,
        widgetType: response.widgetType
      }]);
      setIsTyping(false);
    }, 850);
  };

  const runJobMatchAnalysis = () => {
    if (!jobTitle.trim() && !jobSkills.trim()) return;

    setIsTyping(true);
    setTimeout(() => {
      // Calculate a realistic score based on IT skills
      const titleLower = jobTitle.toLowerCase() + ' ' + jobSkills.toLowerCase();
      let score = 75; // Baseline
      
      const matchedStrengths: string[] = [];
      
      // Look for Java/Spring/Backend match
      if (titleLower.includes('java') || titleLower.includes('spring') || titleLower.includes('backend')) {
        score += 15;
        matchedStrengths.push("Expert B.Tech Java & Spring Boot foundation");
      }
      
      // Look for Frontend/React match
      if (titleLower.includes('react') || titleLower.includes('frontend') || titleLower.includes('web')) {
        score += 12;
        matchedStrengths.push("Robust Frontend development using React & Tailwind CSS");
      }

      // Look for SQL/Database match
      if (titleLower.includes('sql') || titleLower.includes('database') || titleLower.includes('mongodb') || titleLower.includes('mysql')) {
        score += 8;
        matchedStrengths.push("Experienced with MySQL, MongoDB, and local client sync");
      }

      // Look for AI/ML match
      if (titleLower.includes('ai') || titleLower.includes('ml') || titleLower.includes('generative') || titleLower.includes('prompt')) {
        score += 5;
        matchedStrengths.push("Infosys Virtual AI Intern & Forage GenAI certified");
      }

      score = Math.min(score, 98); // Max 98% for realistic humility

      let level = "Highly Recommended";
      let rec = "Jeevika holds excellent credentials for this role. Her internship at Infosys and academic focus on end-to-end encrypted CMS projects demonstrate critical engineering skills. Highly recommended for immediate technical rounds.";
      
      if (score < 80) {
        level = "Potential Fit (Growth Candidate)";
        rec = "Jeevika meets the key baseline qualifications. While she might need some onboarding for this specific stack, her high GPA (8.74) and fast learning agility make her an outstanding junior asset.";
      }

      setMatchResult({
        score,
        matchLevel: level,
        strengths: matchedStrengths.length > 0 ? matchedStrengths : ["Strong core B.Tech IT curriculum", "Quick technical agility", "Excellent team communication"],
        gapAnalysis: "Fully matches curriculum requirements; minor production framework training might be needed depending on internal system size.",
        recommendation: rec
      });
      setIsTyping(false);
    }, 1200);
  };

  const generateLocalResponse = (query: string): { text: string; isWidget?: boolean; widgetType?: 'matcher' | 'skills' | 'contact' } => {
    const q = query.toLowerCase();

    if (q.includes('match') || q.includes('hire') || q.includes('job') || q.includes('recruiter') || q.includes('suitability')) {
      return {
        text: "Sure! Let's analyze Jeevika's matching metrics for your open role. Please use the interactive placement analyzer below to input your job parameters and get an instant engineering compatibility score! 📈",
        isWidget: true,
        widgetType: 'matcher'
      };
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('technologies') || q.includes('code') || q.includes('language')) {
      return {
        text: "Jeevika's core technical expertise consists of:\n\n• **Backend Core**: Java (Spring Boot), REST APIs, Vector-clocks synchronization.\n• **Frontend Interface**: React, Tailwind CSS, Bootstrap, responsive design.\n• **Database Systems**: MySQL, MongoDB, local storage (IndexedDB).\n• **AI & Automation**: Generative AI prompting, basic ML pipelines, Infosys AI event scheduler.\n\nShe holds verified certifications from NPTEL in Java & ML, making her highly agile in any software team!",
        isWidget: true,
        widgetType: 'skills'
      };
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('address') || q.includes('reach')) {
      return {
        text: "You can reach Jeevika instantly via these verified communication channels:",
        isWidget: true,
        widgetType: 'contact'
      };
    }

    if (q.includes('intern') || q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('infosys')) {
      return {
        text: "Jeevika has completed **3 internships & training programs**:\n\n1. **Infosys Virtual Internship** (11/2025): Developed \"EventMate,\" an AI-based event scheduler and client booking flow in React.\n2. **Forage Generative AI Internship** (06/2025): Studied model safety, advanced prompt engineering, and LLM integrations.\n3. **Brinary Spot Technologies Trainee**: Intensive training covering Python, full-stack web development, and foundational Data Structures & Algorithms."
      };
    }

    if (q.includes('project') || q.includes('build') || q.includes('encrypted') || q.includes('cms')) {
      return {
        text: "Jeevika's showcase academic project is an **Encrypted Content Management System with Conflict-Free Synchronization**.\n\n• **How it works**: Uses React/Spring Boot with AES-GCM encryption client-side, storing offline edits in IndexedDB.\n• **Vector Clocks**: Automatically resolves synchronization merge-conflicts upon connection re-establishment without exposing raw text to servers.\n\nShe also built **EventMate**, a multi-module scheduler with strict calendar validation mechanics."
      };
    }

    if (q.includes('gpa') || q.includes('cgpa') || q.includes('college') || q.includes('education') || q.includes('vsb')) {
      return {
        text: "Jeevika is pursuing her **B.Tech in Information Technology** at **V.S.B Engineering College** (Karur, Tamil Nadu).\n\n• **Current CGPA**: **8.74 / 10.0** (Top tier academic bracket).\n• **HSC Class XII**: 80% (Sri Vijay Vidyalaya School).\n• **SSLC Class X**: 88% (Sri Vijay Vidyalaya School)."
      };
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return {
        text: "Hello there! I'm here to discuss Jeevika's placement potential. You can ask me about her technical skills, project details, academic timeline, or test her suitability for a role using the Matcher tool!"
      };
    }

    // Default response
    return {
      text: "That's an interesting question! Jeevika is highly skilled in **Java, React, SQL, and AI scheduling solutions**. She is available for placement drives for the 2026/2027 recruitment cycle.\n\nWould you like me to display her contact card, run a role alignment analysis, or outline her technical skill grid?"
    };
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="floating-ai-assistant-btn"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg cursor-pointer z-40 transition-all duration-300 hover:scale-110 flex items-center gap-2 group ${activeTheme.buttonPrimary}`}
        aria-label="Open AI Placement Assistant"
      >
        <MessageSquare className="w-5 h-5 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-36 transition-all duration-300 font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          Recruiter Matcher
        </span>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
      </button>

      {/* Assistant Modal Panel */}
      {isOpen && (
        <div
          id="ai-assistant-panel"
          className={`fixed bottom-24 right-6 w-[92%] sm:w-[420px] h-[550px] rounded-2xl border flex flex-col z-40 shadow-2xl overflow-hidden transition-all duration-300 ${activeTheme.cardBg} ${activeTheme.cardBorder}`}
        >
          {/* Header */}
          <div className={`px-5 py-4 border-b flex items-center justify-between ${activeTheme.border} ${theme === 'chalk' ? 'bg-slate-50' : ''}`}>
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg ${activeTheme.accentBg} ${activeTheme.accentText}`}>
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className={`font-bold text-sm tracking-tight ${activeTheme.textPrimary}`}>Placement Matcher</h3>
                <p className="text-[10px] font-mono text-slate-400 font-medium">REAL-TIME LOCAL COGNITIVE HUB</p>
              </div>
            </div>
            <button
              id="ai-assistant-close-btn"
              onClick={() => setIsOpen(false)}
              className={`p-1 rounded-md text-slate-400 hover:text-slate-200 transition-colors cursor-pointer ${theme === 'chalk' ? 'hover:text-slate-800' : ''}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? `${activeTheme.buttonPrimary} rounded-tr-none shadow-3xs`
                      : `${theme === 'chalk' ? 'bg-slate-100 text-slate-850' : 'bg-slate-800/60 text-slate-100 border border-slate-700/40'} rounded-tl-none`
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                
                {/* Embedded Interactivity Widgets */}
                {msg.isWidget && msg.widgetType === 'matcher' && (
                  <div className={`w-full mt-3 p-4 rounded-xl border space-y-3 shadow-3xs ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
                    <p className={`text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 ${activeTheme.accentText}`}>
                      Interactive Matching Sandbox
                    </p>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Job Title (e.g., Java Developer)"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs rounded-md border focus:outline-hidden ${theme === 'chalk' ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500' : 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500'}`}
                      />
                      <textarea
                        placeholder="Required Skills (e.g., Spring Boot, React, SQL)"
                        value={jobSkills}
                        onChange={(e) => setJobSkills(e.target.value)}
                        rows={2}
                        className={`w-full px-3 py-1.5 text-xs rounded-md border focus:outline-hidden resize-none ${theme === 'chalk' ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500' : 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500'}`}
                      />
                    </div>
                    
                    <button
                      id="ai-run-matcher-btn"
                      onClick={runJobMatchAnalysis}
                      className={`w-full py-2 rounded-md font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${activeTheme.buttonPrimary}`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Evaluate Candidate Compatibility
                    </button>

                    {matchResult && (
                      <div className={`mt-3 p-3.5 rounded-lg border space-y-2.5 transition-all duration-300 ${theme === 'chalk' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-extrabold uppercase text-slate-400">Match Accuracy</span>
                          <span className={`px-2 py-0.5 rounded-md font-mono text-xs font-black ${matchResult.score >= 90 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-400'}`}>
                            {matchResult.score}%
                          </span>
                        </div>
                        
                        {/* Dynamic Progress Indicator Bar */}
                        <div className="w-full h-1.5 bg-slate-700/30 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${matchResult.score >= 90 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                            style={{ width: `${matchResult.score}%` }}
                          />
                        </div>

                        <div className="space-y-1">
                          <p className={`text-xs font-bold ${activeTheme.textPrimary}`}>{matchResult.matchLevel}</p>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{matchResult.recommendation}</p>
                        </div>

                        <div className="pt-2.5 border-t border-slate-200/20 space-y-1">
                          <p className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-500" /> Key Match Pillars:
                          </p>
                          <ul className="space-y-1 pl-4 list-disc text-[10px] text-slate-400">
                            {matchResult.strengths.map((st, i) => (
                              <li key={i}>{st}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {msg.isWidget && msg.widgetType === 'skills' && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 w-full">
                    {['Java', 'React', 'Spring Boot', 'SQL', 'MongoDB', 'GenAI', 'Tailwind'].map(skill => (
                      <span key={skill} className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono font-bold uppercase ${theme === 'chalk' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {msg.isWidget && msg.widgetType === 'contact' && (
                  <div className={`w-full mt-3 p-3.5 rounded-xl border space-y-2.5 shadow-3xs ${theme === 'chalk' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono text-slate-400">Email:</span>
                        <a href="mailto:jeevikachinnathambi2005@gmail.com" className={`font-bold hover:underline ${activeTheme.accentText}`}>
                          jeevikachinnathambi2005@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono text-slate-400">Phone:</span>
                        <a href="tel:+919043104201" className={`font-bold hover:underline ${activeTheme.accentText}`}>
                          +91 9043104201
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono text-slate-400">LinkedIn:</span>
                        <a href="https://linkedin.com/in/jeevika-c-590050327" target="_blank" rel="noreferrer" className={`font-bold hover:underline ${activeTheme.accentText}`}>
                          in/jeevika-c-590050327
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <span className="text-[9px] font-mono text-slate-400/80 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start space-y-1.5">
                <div className={`rounded-xl px-4 py-2.5 bg-slate-800/40 text-slate-150 border border-slate-700/30 rounded-tl-none flex items-center gap-1`}>
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt Chips */}
          <div className={`px-4 py-2 border-t flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar ${activeTheme.border}`}>
            <button
              onClick={() => handleSend("Evaluate candidate for a Java role")}
              className={`px-3 py-1 rounded-lg border text-[10px] font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${theme === 'chalk' ? 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
            >
              💼 Hire Matcher
            </button>
            <button
              onClick={() => handleSend("What are her core technical skills?")}
              className={`px-3 py-1 rounded-lg border text-[10px] font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${theme === 'chalk' ? 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
            >
              💻 Tech Stack
            </button>
            <button
              onClick={() => handleSend("How to contact Jeevika?")}
              className={`px-3 py-1 rounded-lg border text-[10px] font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${theme === 'chalk' ? 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
            >
              📞 Get Contact Card
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
            className={`p-3 border-t flex gap-2 ${activeTheme.border}`}
          >
            <input
              id="ai-assistant-input"
              type="text"
              placeholder="Ask me anything about Jeevika..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`flex-1 px-4 py-2 text-xs rounded-xl border focus:outline-hidden ${theme === 'chalk' ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-600' : 'bg-slate-900 border-slate-850 text-white focus:border-indigo-500'}`}
            />
            <button
              id="ai-assistant-send-btn"
              type="submit"
              className={`p-2 rounded-xl transition-all flex items-center justify-center cursor-pointer ${activeTheme.buttonPrimary}`}
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

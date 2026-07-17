import { useState } from 'react';
import { Github, ExternalLink, Code2, ShieldAlert, Sparkles, CheckCircle, Wifi, WifiOff, RefreshCw, Key, Calendar, AlertCircle, BarChart3, Info } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { projectsData } from '../data';
import { ThemeType, themes } from '../lib/theme';

interface ProjectsProps {
  theme: ThemeType;
}

export default function Projects({ theme }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'react' | 'java' | 'ai'>('all');
  const activeTheme = themes[theme];

  // Dynamically calculate technology frequencies from projectsData
  const techCounts: Record<string, number> = {};
  projectsData.forEach(proj => {
    proj.technologies.forEach(tech => {
      let normalized = tech;
      if (tech.toLowerCase().includes('algorithm')) normalized = 'AI Algorithms';
      techCounts[normalized] = (techCounts[normalized] || 0) + 1;
    });
  });

  const chartData = Object.entries(techCounts)
    .map(([name, count]) => ({
      name,
      count,
      category: name === 'React' || name === 'HTML' || name === 'CSS' ? 'Frontend' :
                name === 'Spring Boot' || name === 'Node.js' ? 'Backend' :
                name === 'MongoDB' || name === 'IndexedDB' ? 'Storage/DB' :
                name === 'AES-GCM' ? 'Security' : 'Other'
    }))
    .sort((a, b) => b.count - a.count);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-xl border shadow-lg font-sans text-xs ${
          theme === 'chalk' 
            ? 'bg-white border-slate-250 text-slate-900 shadow-md' 
            : theme === 'cosmic' 
              ? 'bg-[#0f172a] border-slate-800 text-slate-100 shadow-xl' 
              : 'bg-[#043E31] border-emerald-800/50 text-emerald-50 shadow-xl'
        }`}>
          <p className="font-bold">{data.name}</p>
          <p className="mt-1 opacity-90">Category: <span className="font-semibold">{data.category}</span></p>
          <p className="mt-0.5 opacity-90">Project Usage: <span className="font-semibold">{data.count} {data.count === 1 ? 'project' : 'projects'}</span></p>
        </div>
      );
    }
    return null;
  };

  // Playground 1 State (Encrypted CMS)
  const [cmsSandboxOpen, setCmsSandboxOpen] = useState(false);
  const [cmsInput, setCmsInput] = useState('Academics discussion notes.');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [ciphertext, setCiphertext] = useState('');
  const [authTag, setAuthTag] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const [clientVersion, setClientVersion] = useState(1);
  const [serverVersion, setServerVersion] = useState(1);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'unsynced' | 'conflict' | 'syncing'>('synced');
  const [syncLog, setSyncLog] = useState<string[]>(['System initialized. Status: Connected. Synced.']);

  // Playground 2 State (EventMate Scheduler)
  const [eventSandboxOpen, setEventSandboxOpen] = useState(false);
  const [events, setEvents] = useState([
    { id: 1, title: 'Placement Briefing', start: '09:00', end: '10:00', color: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
    { id: 2, title: 'Technical Interview Practice', start: '10:00', end: '11:00', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40' },
  ]);
  const [newEventTitle, setNewEventTitle] = useState('Group Discussion Meet');
  const [newEventStart, setNewEventStart] = useState('10:30');
  const [newEventEnd, setNewEventEnd] = useState('11:30');
  const [overlapAlert, setOverlapAlert] = useState<string | null>(null);

  const filteredProjects = projectsData.filter(proj => {
    if (activeTab === 'all') return true;
    if (activeTab === 'java') return proj.technologies.some(tech => tech.toLowerCase().includes('java') || tech.toLowerCase().includes('spring boot'));
    if (activeTab === 'react') return proj.technologies.some(tech => tech.toLowerCase().includes('react'));
    if (activeTab === 'ai') return proj.technologies.some(tech => tech.toLowerCase().includes('ai') || tech.toLowerCase().includes('algorithm'));
    return true;
  });

  // CMS Cryptography & Sync Logic
  const handleEncrypt = () => {
    if (!cmsInput.trim()) return;
    setIsEncrypted(true);
    // Simple mock AES-GCM simulation showing realistic bytes
    const mockCipher = btoa(cmsInput).substring(0, 24) + '...[AES-256-GCM]';
    const mockTag = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setCiphertext(mockCipher);
    setAuthTag(mockTag);
    setSyncLog(prev => [...prev, `Client: Encrypted local edit using AES-GCM. Auth Tag derived: ${mockTag.substring(0,6)}`]);
  };

  const handleCmsEdit = (val: string) => {
    setCmsInput(val);
    if (isOffline) {
      setSyncStatus('unsynced');
      setClientVersion(v => v + 1);
      setSyncLog(prev => [...prev, `Client Offline Edit: Version updated to v${clientVersion + 1}. Pending cloud sync.`]);
    }
  };

  const toggleOffline = () => {
    const nextOffline = !isOffline;
    setIsOffline(nextOffline);
    if (nextOffline) {
      setSyncLog(prev => [...prev, `Network Status: Link disconnected. Entering Offline Mode (IndexedDB active).`]);
    } else {
      setSyncLog(prev => [...prev, `Network Status: Link restored. Re-checking remote version vector.`]);
      // If we made offline edits, simulate a conflict on reconnect if client and server both drifted
      if (syncStatus === 'unsynced') {
        // Mock a conflict
        setServerVersion(2); // Server drifted too
        setSyncStatus('conflict');
        setSyncLog(prev => [...prev, `Sync Alert: Vector conflict found! Client version vector v${clientVersion} drifts from remote cloud vector v2.`]);
      }
    }
  };

  const handleResolveAndSync = () => {
    setSyncStatus('syncing');
    setSyncLog(prev => [...prev, `Syncing: Initiating Vector-clock merging protocol...`]);
    setTimeout(() => {
      setClientVersion(Math.max(clientVersion, serverVersion) + 1);
      setServerVersion(Math.max(clientVersion, serverVersion) + 1);
      setSyncStatus('synced');
      setIsEncrypted(false);
      setSyncLog(prev => [
        ...prev, 
        `Sync Success: Vector clocks unified. AES-GCM authentication verified. All notes synced securely to MongoDB.`
      ]);
    }, 1200);
  };

  // EventMate Smart Scheduling Logic
  const handleAddEvent = () => {
    if (!newEventTitle.trim()) return;

    // Check overlaps
    const startNum = convertTimeToMinutes(newEventStart);
    const endNum = convertTimeToMinutes(newEventEnd);

    if (endNum <= startNum) {
      setOverlapAlert("End time must be after start time!");
      return;
    }

    let hasOverlap = false;
    events.forEach(ev => {
      const s = convertTimeToMinutes(ev.start);
      const e = convertTimeToMinutes(ev.end);
      if ((startNum >= s && startNum < e) || (endNum > s && endNum <= e) || (startNum <= s && endNum >= e)) {
        hasOverlap = true;
      }
    });

    if (hasOverlap) {
      setOverlapAlert(`Scheduling Conflict detected between ${newEventStart} - ${newEventEnd}! EventMate validator triggered.`);
    } else {
      setEvents(prev => [...prev, {
        id: Date.now(),
        title: newEventTitle,
        start: newEventStart,
        end: newEventEnd,
        color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
      }]);
      setOverlapAlert(null);
    }
  };

  const convertTimeToMinutes = (timeStr: string): number => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const handleAutoResolveSchedule = () => {
    if (!overlapAlert) return;
    
    // Auto shift new event to next available block (after last event ends)
    let lastEnd = 0;
    events.forEach(ev => {
      const e = convertTimeToMinutes(ev.end);
      if (e > lastEnd) lastEnd = e;
    });

    const duration = convertTimeToMinutes(newEventEnd) - convertTimeToMinutes(newEventStart);
    const nextStartMin = lastEnd;
    const nextEndMin = lastEnd + duration;

    const padZero = (n: number) => String(n).padStart(2, '0');
    const startStr = `${padZero(Math.floor(nextStartMin / 60))}:${padZero(nextStartMin % 60)}`;
    const endStr = `${padZero(Math.floor(nextEndMin / 60))}:${padZero(nextEndMin % 60)}`;

    setEvents(prev => [...prev, {
      id: Date.now(),
      title: newEventTitle,
      start: startStr,
      end: endStr,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/40 animate-pulse'
    }]);

    setOverlapAlert(null);
  };

  return (
    <section id="projects" className={`py-24 border-b transition-all duration-300 ${activeTheme.sectionBg} ${activeTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean Utility with vertical indicator */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-5 rounded-full ${activeTheme.accent}`}></span>
            <p className={`text-xs uppercase font-mono font-bold tracking-widest ${activeTheme.accentText}`}>Academic & Personal Projects</p>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight pl-3.5 border-l-2 ${activeTheme.border} ${activeTheme.textPrimary}`}>
            My Creative Engineering Projects
          </h2>
        </div>

        {/* Tab Filters - Flat Minimal Outline */}
        <div className="flex justify-start sm:justify-center gap-2 mb-12 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'react', label: 'React / Frontend' },
            { id: 'java', label: 'Java / Spring Boot' },
            { id: 'ai', label: 'AI & Algorithms' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-all duration-200 shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? `${activeTheme.buttonPrimary} shadow-2xs`
                  : `${activeTheme.buttonSecondary}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {filteredProjects.map((proj) => {
            const isEncryptedCms = proj.id === 'proj-1';
            
            return (
              <div
                key={proj.id}
                className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-md ${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder}`}
              >
                {/* Card Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Badge & Title */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg border ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.accentText}`}>
                          {isEncryptedCms ? <Code2 className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        </div>
                        <span className="text-xs uppercase tracking-wider font-mono font-bold text-slate-400">
                          {isEncryptedCms ? "Security & Cloud Integration" : "AI & Interface Orchestration"}
                        </span>
                      </div>
                      
                      {/* Sandbox Toggle Button */}
                      <button
                        onClick={() => isEncryptedCms ? setCmsSandboxOpen(!cmsSandboxOpen) : setEventSandboxOpen(!eventSandboxOpen)}
                        className={`px-3 py-1 text-[10px] font-mono font-bold uppercase border rounded-md cursor-pointer transition-all ${
                          (isEncryptedCms ? cmsSandboxOpen : eventSandboxOpen)
                            ? `${activeTheme.accentText} ${activeTheme.accentBg} ${activeTheme.cardBorder}`
                            : `${activeTheme.buttonSecondary}`
                        }`}
                      >
                        {(isEncryptedCms ? cmsSandboxOpen : eventSandboxOpen) ? "Close Sandbox ❌" : "Try Interactive Sandbox ⚡"}
                      </button>
                    </div>

                    <h3 className={`text-xl sm:text-2xl font-extrabold transition-colors ${activeTheme.textPrimary} group-hover:${theme === 'chalk' ? 'text-blue-600' : theme === 'cosmic' ? 'text-indigo-400' : 'text-emerald-400'}`}>
                      {proj.title}
                    </h3>
                  </div>

                  {/* Sandbox Expansion Panel */}
                  {isEncryptedCms && cmsSandboxOpen && (
                    <div className={`p-4 sm:p-5 rounded-xl border space-y-4 font-sans animate-fadeIn ${theme === 'chalk' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Key className={`w-4 h-4 ${activeTheme.accentText}`} />
                          <span className={`text-xs font-bold font-mono uppercase ${activeTheme.textPrimary}`}>CMS Crypto Sandbox</span>
                        </div>
                        <button
                          onClick={toggleOffline}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                            isOffline ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                          {isOffline ? 'Offline Mode' : 'Connected'}
                        </button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase text-slate-400">Write Note (Auto AES-GCM Check):</label>
                        <input
                          type="text"
                          value={cmsInput}
                          onChange={(e) => handleCmsEdit(e.target.value)}
                          className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-hidden ${theme === 'chalk' ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'}`}
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleEncrypt}
                          disabled={isEncrypted}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer ${isEncrypted ? 'opacity-40' : activeTheme.buttonPrimary}`}
                        >
                          Lock & Encrypt File
                        </button>
                        
                        {(isOffline || syncStatus !== 'synced') && (
                          <button
                            onClick={handleResolveAndSync}
                            disabled={syncStatus === 'syncing'}
                            className="flex-1 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase bg-emerald-600 hover:bg-emerald-700 text-white tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <RefreshCw className={`w-3 h-3 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                            Sync to Server
                          </button>
                        )}
                      </div>

                      {/* Decryption status panel */}
                      {isEncrypted && (
                        <div className={`p-3 rounded-lg border text-[11px] font-mono space-y-1 leading-normal ${theme === 'chalk' ? 'bg-blue-50/40 border-blue-100' : 'bg-slate-950 border-slate-800'}`}>
                          <p className={`font-bold ${activeTheme.accentText}`}>🔒 Client AES-GCM Envelope:</p>
                          <p className="text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap"><span className="text-slate-500">Ciphertext:</span> {ciphertext}</p>
                          <p className="text-slate-400"><span className="text-slate-500">Auth Tag:</span> {authTag}</p>
                        </div>
                      )}

                      {/* Vector clock info */}
                      <div className="flex items-center justify-between text-[10px] font-mono border-t border-slate-200/10 pt-3">
                        <span className="text-slate-400">Vector Clock Vectors:</span>
                        <span className={`px-2 py-0.5 rounded-sm ${syncStatus === 'conflict' ? 'bg-red-500/10 text-red-400' : 'bg-slate-800/40 text-slate-300'}`}>
                          Client: [v{clientVersion}] | Server: [v{serverVersion}]
                        </span>
                      </div>

                      {/* Console logs */}
                      <div className="p-2.5 rounded-lg bg-black/80 font-mono text-[9px] text-emerald-400 space-y-1 h-20 overflow-y-auto border border-slate-800">
                        {syncLog.map((log, index) => (
                          <p key={index} className="leading-normal">&gt; {log}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isEncryptedCms && eventSandboxOpen && (
                    <div className={`p-4 sm:p-5 rounded-xl border space-y-4 font-sans animate-fadeIn ${theme === 'chalk' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className={`w-4 h-4 ${activeTheme.accentText}`} />
                        <span className={`text-xs font-bold font-mono uppercase ${activeTheme.textPrimary}`}>Calendar Scheduler Sandbox</span>
                      </div>

                      {/* Calendar Stack view */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase text-slate-400">Active Day Timeline:</label>
                        <div className="space-y-1.5">
                          {events.map(ev => (
                            <div key={ev.id} className={`p-2 rounded-lg border text-xs flex items-center justify-between font-mono ${ev.color}`}>
                              <span className="font-sans font-bold">{ev.title}</span>
                              <span className="text-[10px] font-bold">{ev.start} - {ev.end}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Error Overlap Alert */}
                      {overlapAlert && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs flex flex-col gap-2 leading-relaxed">
                          <p className="flex items-center gap-1.5 font-bold"><AlertCircle className="w-4 h-4" /> Schedule Conflict Detected!</p>
                          <p className="text-[11px] pl-5 text-red-200">{overlapAlert}</p>
                          <button
                            onClick={handleAutoResolveSchedule}
                            className="self-end px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-[10px] font-mono font-bold uppercase cursor-pointer"
                          >
                            Resolve with AI Shift Optimizer ⚡
                          </button>
                        </div>
                      )}

                      {/* Add new event controller */}
                      <div className="space-y-2.5 border-t border-slate-200/10 pt-3">
                        <p className="text-[10px] font-mono font-bold uppercase text-slate-400">Schedule New Event:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="col-span-2">
                            <input
                              type="text"
                              placeholder="Event Title"
                              value={newEventTitle}
                              onChange={(e) => setNewEventTitle(e.target.value)}
                              className={`w-full px-2.5 py-1.5 rounded-md border focus:outline-hidden ${theme === 'chalk' ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'}`}
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-mono text-slate-400 block mb-0.5">Start:</label>
                            <input
                              type="time"
                              value={newEventStart}
                              onChange={(e) => setNewEventStart(e.target.value)}
                              className={`w-full px-2.5 py-1.5 rounded-md border focus:outline-hidden ${theme === 'chalk' ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'}`}
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-mono text-slate-400 block mb-0.5">End:</label>
                            <input
                              type="time"
                              value={newEventEnd}
                              onChange={(e) => setNewEventEnd(e.target.value)}
                              className={`w-full px-2.5 py-1.5 rounded-md border focus:outline-hidden ${theme === 'chalk' ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'}`}
                            />
                          </div>
                        </div>
                        <button
                          onClick={handleAddEvent}
                          className={`w-full py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer ${activeTheme.buttonPrimary}`}
                        >
                          Book & Validate Schedule
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Core Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed text-justify ${activeTheme.textSecondary}`}>
                    {proj.description}
                  </p>

                  {/* Tech badging */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map(tech => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 border rounded-lg text-xs font-mono font-semibold ${activeTheme.badgeBg} ${activeTheme.cardBorder} ${activeTheme.textSecondary}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Key Features */}
                  <div className={`space-y-2.5 border-t pt-5 ${activeTheme.border}`}>
                    <h4 className="text-xs uppercase font-mono font-extrabold tracking-wider text-slate-400">
                      Key Features & Architectures
                    </h4>
                    <div className="space-y-2">
                      {proj.features.map((feature, fIdx) => (
                        <div key={fIdx} className={`flex items-start gap-2.5 text-xs sm:text-sm ${activeTheme.textSecondary}`}>
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenges Solved */}
                  <div className={`p-4 rounded-xl space-y-1.5 border ${activeTheme.alertBg} ${activeTheme.alertBorder}`}>
                    <div className={`flex items-center gap-2 ${activeTheme.accentText}`}>
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <h4 className="text-xs uppercase font-mono font-bold tracking-wider">
                        Engineering Challenge Solved
                      </h4>
                    </div>
                    <p className={`text-xs leading-relaxed text-justify ${activeTheme.textSecondary}`}>
                      {proj.challenges}
                    </p>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className={`px-6 py-5 border-t flex items-center justify-between gap-4 bg-slate-50/5 ${activeTheme.border}`}>
                  <a
                    id={`project-github-btn-${proj.id}`}
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider rounded-lg transition-all shadow-3xs hover:shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer ${activeTheme.buttonSecondary}`}
                  >
                    <Github className="w-4 h-4" />
                    GitHub Repo
                  </a>

                  <a
                    id={`project-demo-btn-${proj.id}`}
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-white rounded-lg transition-all shadow-3xs hover:shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer ${
                      theme === 'chalk' ? 'bg-blue-600 hover:bg-blue-700' : theme === 'cosmic' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Analytics Bento Panel */}
        <div className={`mt-16 border rounded-3xl p-6 sm:p-8 transition-all duration-300 no-print ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            
            {/* Chart Area */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <BarChart3 className={`w-5 h-5 ${activeTheme.accentText}`} />
                <h4 className={`font-sans font-bold text-base sm:text-lg tracking-tight ${activeTheme.textPrimary}`}>
                  Tech Stack Usage Analytics
                </h4>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${activeTheme.textSecondary}`}>
                A quantitative summary of key languages, frameworks, and database mechanisms employed across my portfolio projects.
              </p>
              
              <div className="h-64 sm:h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                  >
                    <XAxis 
                      type="number" 
                      tick={{ fill: theme === 'chalk' ? '#475569' : theme === 'cosmic' ? '#94a3b8' : '#34d399', fontSize: 10 }}
                      stroke={theme === 'chalk' ? '#cbd5e1' : theme === 'cosmic' ? '#334155' : '#064e3b'}
                      domain={[0, 2]}
                      allowDecimals={false}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fill: theme === 'chalk' ? '#475569' : theme === 'cosmic' ? '#94a3b8' : '#34d399', fontSize: 10 }}
                      stroke={theme === 'chalk' ? '#cbd5e1' : theme === 'cosmic' ? '#334155' : '#064e3b'}
                      width={120}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={14}>
                      {chartData.map((entry, index) => {
                        let barColor = '';
                        if (theme === 'chalk') {
                          barColor = entry.count === 2 ? '#1d4ed8' : '#3b82f6';
                        } else if (theme === 'cosmic') {
                          barColor = entry.count === 2 ? '#6366f1' : '#818cf8';
                        } else {
                          barColor = entry.count === 2 ? '#10b981' : '#34d399';
                        }
                        return <Cell key={`cell-${index}`} fill={barColor} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Metrics Info Area */}
            <div className={`lg:w-1/3 border-t lg:border-t-0 lg:border-l pt-8 lg:pt-0 lg:pl-8 flex flex-col justify-between space-y-6 ${activeTheme.border}`}>
              <div className="space-y-4">
                <h5 className={`font-sans font-bold text-xs tracking-wide uppercase ${activeTheme.textPrimary}`}>
                  Stack Synthesis & Highlights
                </h5>
                
                <div className="space-y-3">
                  <div className={`p-3.5 border rounded-xl shadow-3xs flex items-start gap-3 ${activeTheme.badgeBg} ${activeTheme.cardBorder}`}>
                    <div className="mt-0.5">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <p className={`text-xs font-bold font-sans ${activeTheme.textPrimary}`}>Client Security Protocols</p>
                      <p className={`text-[11px] leading-relaxed ${activeTheme.textSecondary}`}>
                        Uses authenticated AES-GCM (256-bit key) inside browser threads to handle document payloads before synchronizing with any database.
                      </p>
                    </div>
                  </div>

                  <div className={`p-3.5 border rounded-xl shadow-3xs flex items-start gap-3 ${activeTheme.badgeBg} ${activeTheme.cardBorder}`}>
                    <div className="mt-0.5">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    </div>
                    <div className="space-y-1">
                      <p className={`text-xs font-bold font-sans ${activeTheme.textPrimary}`}>Conflict Resolution Vectors</p>
                      <p className={`text-[11px] leading-relaxed ${activeTheme.textSecondary}`}>
                        Employs vector-clocks and hash-integrity checks in Spring Boot to unify drifted off-grid browser revisions with cloud MongoDB clusters.
                      </p>
                    </div>
                  </div>

                  <div className={`p-3.5 border rounded-xl shadow-3xs flex items-start gap-3 ${activeTheme.badgeBg} ${activeTheme.cardBorder}`}>
                    <div className="mt-0.5">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <p className={`text-xs font-bold font-sans ${activeTheme.textPrimary}`}>AI-Driven Overlap Resolvers</p>
                      <p className={`text-[11px] leading-relaxed ${activeTheme.textSecondary}`}>
                        Uses frontend scheduling validation coupled with automatic resource-shift heuristics to eliminate venue booking overlaps in real-time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`border-t pt-4 text-[10px] font-mono leading-relaxed flex items-center gap-2 text-slate-450 ${activeTheme.border}`}>
                <Info className="w-4 h-4 shrink-0" />
                <span>Hover over bars to analyze individual component properties. This chart builds dynamically from real project profiles.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

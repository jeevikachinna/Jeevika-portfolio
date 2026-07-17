import { X, Mail, Phone, MapPin, Linkedin, Github, Download, Printer } from 'lucide-react';
import { personalInfo, educationData, skillsData, internshipsData, projectsData, certificationsData, softSkills } from '../data';
import { ThemeType, themes } from '../lib/theme';

interface ResumeModalProps {
  theme: ThemeType;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ theme, isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const activeTheme = themes[theme];

  const handlePrint = () => {
    const printContent = document.getElementById('resume-document-content');
    if (!printContent) return;

    const originalContent = document.body.innerHTML;
    const printWindow = window.open('', '', 'height=900,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>JEEVIKA_C_RESUME</title>');
      printWindow.document.write('<script src="https://cdn.tailwindcss.com"></script>');
      printWindow.document.write('<style>@media print { body { padding: 20px; } }</style>');
      printWindow.document.write('</head><body class="bg-white text-slate-900 font-sans">');
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  const handleDownloadText = () => {
    let text = `==================================================\n`;
    text += `                     ${personalInfo.name}\n`;
    text += `==================================================\n\n`;
    text += `Email: ${personalInfo.email} | Phone: ${personalInfo.phone}\n`;
    text += `Location: ${personalInfo.location}\n`;
    text += `LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}\n\n`;
    
    text += `--------------------------------------------------\n`;
    text += `PROFESSIONAL SUMMARY\n`;
    text += `--------------------------------------------------\n`;
    text += `${personalInfo.summary}\n\n`;
    
    text += `--------------------------------------------------\n`;
    text += `EDUCATION\n`;
    text += `--------------------------------------------------\n`;
    educationData.forEach(edu => {
      text += `* ${edu.degree} | ${edu.institution}\n`;
      text += `  ${edu.cgpaOrPercentage} | ${edu.duration}\n`;
    });
    text += `\n`;
    
    text += `--------------------------------------------------\n`;
    text += `TECHNICAL SKILLS\n`;
    text += `--------------------------------------------------\n`;
    skillsData.forEach(cat => {
      text += `* ${cat.title}: ${cat.skills.join(', ')}\n`;
    });
    text += `\n`;

    text += `--------------------------------------------------\n`;
    text += `INTERNSHIPS\n`;
    text += `--------------------------------------------------\n`;
    internshipsData.forEach(intern => {
      text += `* ${intern.role} | ${intern.organization} (${intern.duration})\n`;
      intern.responsibilities.forEach(resp => {
        text += `  - ${resp}\n`;
      });
    });
    text += `\n`;

    text += `--------------------------------------------------\n`;
    text += `PROJECTS\n`;
    text += `--------------------------------------------------\n`;
    projectsData.forEach(proj => {
      text += `* ${proj.title}\n`;
      text += `  Technologies: ${proj.technologies.join(', ')}\n`;
      proj.features.forEach(feat => {
        text += `  - ${feat}\n`;
      });
      text += `  Challenge Solved: ${proj.challenges}\n\n`;
    });

    text += `--------------------------------------------------\n`;
    text += `CERTIFICATIONS\n`;
    text += `--------------------------------------------------\n`;
    certificationsData.forEach(cert => {
      text += `* ${cert.title} — ${cert.issuer} (${cert.year})\n`;
    });
    text += `\n`;

    text += `--------------------------------------------------\n`;
    text += `SOFT SKILLS\n`;
    text += `--------------------------------------------------\n`;
    text += `${softSkills.join(', ')}\n\n`;

    text += `Generated from Jeevika's Digital Portfolio - ${new Date().toLocaleDateString()}`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JEEVIKA_C_RESUME.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const headerBg = theme === 'chalk'
    ? 'bg-slate-900 border-b border-slate-200'
    : theme === 'cosmic'
      ? 'bg-[#0B0F19] border-b border-slate-800'
      : 'bg-[#02241C] border-b border-emerald-900/60';

  const downloadBtnBg = theme === 'chalk'
    ? 'bg-blue-600 hover:bg-blue-700'
    : theme === 'cosmic'
      ? 'bg-indigo-600 hover:bg-indigo-700'
      : 'bg-emerald-600 hover:bg-emerald-700';

  return (
    <div
      id="resume-modal-overlay"
      className="fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm"
    >
      {/* Modal Container */}
      <div className={`rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col my-8 h-[90vh] ${activeTheme.sectionBgAlt} border ${activeTheme.cardBorder}`}>
        
        {/* Header Bar */}
        <div className={`px-6 py-4 flex items-center justify-between text-white shrink-0 ${headerBg}`}>
          <div className="space-y-0.5">
            <h2 className="font-sans font-bold text-lg flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${theme === 'chalk' ? 'bg-blue-600' : theme === 'cosmic' ? 'bg-indigo-500' : 'bg-emerald-400'}`}></span>
              Jeevika's Official Resume
            </h2>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              ATS-Optimized Formal Layout
            </p>
          </div>
          
          <div className="flex items-center gap-2.5">
            <button
              id="print-resume-btn"
              onClick={handlePrint}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${activeTheme.buttonSecondary}`}
              title="Print Resume"
            >
              <Printer className="w-4.5 h-4.5" />
            </button>
            <button
              id="download-resume-txt-btn"
              onClick={handleDownloadText}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer text-white ${downloadBtnBg}`}
              title="Download Plaintext Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Text</span>
            </button>
            <button
              id="close-resume-modal-btn"
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${activeTheme.buttonSecondary}`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Scrollable Printable Page container (Formally kept white to retain perfect print authenticity) */}
          <div
            id="resume-document-content"
            className="bg-white p-6 sm:p-10 rounded-2xl shadow-xs border border-slate-200/80 max-w-4xl mx-auto text-slate-850 space-y-8"
          >
            {/* Document Header */}
            <div className="text-center space-y-3 pb-6 border-b-2 border-slate-900">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{personalInfo.name}</h1>
              
              {/* Profile details line */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-700 font-medium font-mono">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {personalInfo.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  +91 {personalInfo.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  Krishnagiri, Tamil Nadu
                </span>
              </div>

              {/* Handles line */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-blue-700 font-semibold underline">
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3 text-slate-500" />
                  {personalInfo.linkedin.replace('https://', '')}
                </a>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-1">
                  <Github className="w-3 h-3 text-slate-500" />
                  {personalInfo.github.replace('https://', '')}
                </a>
              </div>
            </div>

            {/* Resume Summary */}
            <div className="space-y-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1">
                Professional Summary
              </h2>
              <p className="text-sm text-slate-750 leading-relaxed text-justify">
                {personalInfo.summary}
              </p>
            </div>

            {/* Resume Education */}
            <div className="space-y-3.5">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1">
                Education
              </h2>
              <div className="space-y-4">
                {educationData.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start text-sm">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900">{edu.degree}</p>
                      <p className="text-slate-700 font-medium italic">{edu.institution}</p>
                    </div>
                    <div className="text-right space-y-0.5 shrink-0 pl-4">
                      <p className="font-bold text-slate-900">{edu.duration}</p>
                      <p className="text-slate-700 font-bold">{edu.cgpaOrPercentage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Skills */}
            <div className="space-y-3.5">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {skillsData.map((cat) => (
                  <p key={cat.title} className="text-slate-750 leading-relaxed">
                    <strong className="text-slate-900">{cat.title}:</strong> {cat.skills.join(', ')}
                  </p>
                ))}
              </div>
            </div>

            {/* Resume Internships */}
            <div className="space-y-3.5">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1">
                Internships
              </h2>
              <div className="space-y-5">
                {internshipsData.map((intern) => (
                  <div key={intern.id} className="space-y-1.5">
                    <div className="flex justify-between items-start text-sm">
                      <p className="font-bold text-slate-900">{intern.role} ({intern.organization})</p>
                      <p className="font-bold text-slate-700 shrink-0 pl-4">{intern.duration}</p>
                    </div>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-slate-750 space-y-1 pl-1">
                      {intern.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Projects */}
            <div className="space-y-3.5">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1">
                Projects
              </h2>
              <div className="space-y-5">
                {projectsData.map((proj) => (
                  <div key={proj.id} className="space-y-2">
                    <p className="font-bold text-slate-900 text-sm">
                      {proj.title}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-650 italic">
                      Technologies: {proj.technologies.join(', ')}
                    </p>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-slate-750 space-y-1 pl-1">
                      {proj.features.map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                    <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-150 leading-relaxed text-justify">
                      <strong className="text-slate-900">Challenge Solved:</strong> {proj.challenges}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Certifications */}
            <div className="space-y-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1">
                Certifications
              </h2>
              <ul className="list-disc list-inside text-xs sm:text-sm text-slate-750 space-y-1">
                {certificationsData.map((cert) => (
                  <li key={cert.id}>
                    <strong className="text-slate-900">{cert.title}</strong> — {cert.issuer} ({cert.year})
                  </li>
                ))}
              </ul>
            </div>

            {/* Resume Soft Skills */}
            <div className="space-y-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-1">
                Soft Skills
              </h2>
              <p className="text-sm text-slate-750">
                {softSkills.join(', ')}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

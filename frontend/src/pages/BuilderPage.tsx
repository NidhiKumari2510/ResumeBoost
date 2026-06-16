import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileEdit, Plus, Trash2, Eye, Download } from 'lucide-react';
import toast from 'react-hot-toast';

type Template = 'modern' | 'student' | 'corporate';

interface Education {
  school: string; degree: string; field: string; year: string; gpa: string;
}
interface Experience {
  company: string; role: string; start: string; end: string; bullets: string;
}
interface Project {
  name: string; tech: string; description: string; link: string;
}
interface Certification {
  name: string; issuer: string; year: string;
}

interface ResumeData {
  name: string; email: string; phone: string; location: string; linkedin: string; github: string;
  summary: string;
  education: Education[];
  skills: string;
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  achievements: string;
}

const defaultResume: ResumeData = {
  name: '', email: '', phone: '', location: '', linkedin: '', github: '',
  summary: '',
  education: [{ school: '', degree: '', field: '', year: '', gpa: '' }],
  skills: '',
  experience: [{ company: '', role: '', start: '', end: '', bullets: '' }],
  projects: [{ name: '', tech: '', description: '', link: '' }],
  certifications: [{ name: '', issuer: '', year: '' }],
  achievements: '',
};

const templates: { id: Template; label: string; accent: string }[] = [
  { id: 'modern', label: 'Modern', accent: '#06b6d4' },
  { id: 'student', label: 'Student', accent: '#10b981' },
  { id: 'corporate', label: 'Corporate', accent: '#3b82f6' },
];

export default function BuilderPage() {
  const [data, setData] = useState<ResumeData>(defaultResume);
  const [template, setTemplate] = useState<Template>('modern');
  const [activeSection, setActiveSection] = useState<string>('personal');

  function update(field: keyof ResumeData, value: any) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function updateArr<T>(field: keyof ResumeData, idx: number, key: keyof T, value: string) {
    setData((prev) => {
      const arr = [...(prev[field] as T[])];
      arr[idx] = { ...arr[idx], [key]: value };
      return { ...prev, [field]: arr };
    });
  }

  function addArr<T>(field: keyof ResumeData, empty: T) {
    setData((prev) => ({ ...prev, [field]: [...(prev[field] as T[]), empty] }));
  }

  function removeArr<T>(field: keyof ResumeData, idx: number) {
    setData((prev) => {
      const arr = (prev[field] as T[]).filter((_, i) => i !== idx);
      return { ...prev, [field]: arr };
    });
  }

  function downloadResume() {
    const el = document.getElementById('resume-preview');
    if (!el) return;
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
      body{font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:40px;color:#111}
      h1{font-size:28px;margin:0}h2{font-size:14px;border-bottom:2px solid ${templates.find(t=>t.id===template)?.accent};padding-bottom:4px;margin-top:16px;text-transform:uppercase;letter-spacing:1px}
      .contact{color:#555;font-size:13px;margin:4px 0}p,li{font-size:13px;line-height:1.5}ul{padding-left:18px;margin:4px 0}
    </style></head><body>${el.innerHTML}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'resume.html'; a.click();
    URL.revokeObjectURL(url);
    toast.success('Resume downloaded as HTML!');
  }

  const accent = templates.find((t) => t.id === template)?.accent || '#06b6d4';

  const sections = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' },
  ];

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                <FileEdit className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-white">Resume Builder</h1>
                <p className="text-sm text-slate-500">Build and preview your resume in real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      template === t.id
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white bg-slate-800/50'
                    }`}
                    style={template === t.id ? { background: t.accent } : {}}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <button onClick={downloadResume} className="btn-primary gap-2 text-sm">
                <Download className="w-4 h-4" />
                Download HTML
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Panel */}
          <div className="space-y-3">
            {/* Section Tabs */}
            <div className="glass-card p-2 flex flex-wrap gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeSection === s.id
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  style={activeSection === s.id ? { background: accent } : {}}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Personal Info */}
            {activeSection === 'personal' && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 space-y-4">
                <h2 className="font-semibold text-white text-sm">Personal Information</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Full Name</label>
                    <input className="input-field text-sm" placeholder="John Doe" value={data.name} onChange={(e) => update('name', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Email</label>
                    <input className="input-field text-sm" placeholder="john@email.com" value={data.email} onChange={(e) => update('email', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Phone</label>
                    <input className="input-field text-sm" placeholder="+1 234 567 8900" value={data.phone} onChange={(e) => update('phone', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Location</label>
                    <input className="input-field text-sm" placeholder="New York, NY" value={data.location} onChange={(e) => update('location', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">LinkedIn</label>
                    <input className="input-field text-sm" placeholder="linkedin.com/in/johndoe" value={data.linkedin} onChange={(e) => update('linkedin', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">GitHub</label>
                    <input className="input-field text-sm" placeholder="github.com/johndoe" value={data.github} onChange={(e) => update('github', e.target.value)} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Summary */}
            {activeSection === 'summary' && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6">
                <h2 className="font-semibold text-white text-sm mb-3">Professional Summary</h2>
                <textarea
                  className="textarea-field h-32 text-sm"
                  placeholder="Write a compelling 2-3 sentence summary of your professional background..."
                  value={data.summary}
                  onChange={(e) => update('summary', e.target.value)}
                />
              </motion.div>
            )}

            {/* Education */}
            {activeSection === 'education' && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 space-y-4">
                <h2 className="font-semibold text-white text-sm">Education</h2>
                {data.education.map((edu, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Entry {i + 1}</span>
                      {i > 0 && (
                        <button onClick={() => removeArr('education', i)} className="text-red-400 hover:text-red-300 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="text-xs text-slate-500 mb-1 block">School / University</label>
                        <input className="input-field text-sm" placeholder="MIT" value={edu.school} onChange={(e) => updateArr<Education>('education', i, 'school', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Degree</label>
                        <input className="input-field text-sm" placeholder="B.Sc." value={edu.degree} onChange={(e) => updateArr<Education>('education', i, 'degree', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Field of Study</label>
                        <input className="input-field text-sm" placeholder="Computer Science" value={edu.field} onChange={(e) => updateArr<Education>('education', i, 'field', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Graduation Year</label>
                        <input className="input-field text-sm" placeholder="2024" value={edu.year} onChange={(e) => updateArr<Education>('education', i, 'year', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">GPA (optional)</label>
                        <input className="input-field text-sm" placeholder="3.8/4.0" value={edu.gpa} onChange={(e) => updateArr<Education>('education', i, 'gpa', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addArr<Education>('education', { school: '', degree: '', field: '', year: '', gpa: '' })}
                  className="btn-secondary gap-2 text-xs w-full"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Education
                </button>
              </motion.div>
            )}

            {/* Skills */}
            {activeSection === 'skills' && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6">
                <h2 className="font-semibold text-white text-sm mb-3">Skills</h2>
                <textarea
                  className="textarea-field h-32 text-sm"
                  placeholder="e.g. JavaScript, React, Node.js, Python, SQL, AWS, Docker..."
                  value={data.skills}
                  onChange={(e) => update('skills', e.target.value)}
                />
                <p className="text-xs text-slate-600 mt-2">Separate skills with commas</p>
              </motion.div>
            )}

            {/* Experience */}
            {activeSection === 'experience' && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 space-y-4">
                <h2 className="font-semibold text-white text-sm">Work Experience</h2>
                {data.experience.map((exp, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Entry {i + 1}</span>
                      {i > 0 && (
                        <button onClick={() => removeArr('experience', i)} className="text-red-400 hover:text-red-300 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Company</label>
                        <input className="input-field text-sm" placeholder="Google" value={exp.company} onChange={(e) => updateArr<Experience>('experience', i, 'company', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Role</label>
                        <input className="input-field text-sm" placeholder="Software Engineer" value={exp.role} onChange={(e) => updateArr<Experience>('experience', i, 'role', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Start Date</label>
                        <input className="input-field text-sm" placeholder="Jan 2022" value={exp.start} onChange={(e) => updateArr<Experience>('experience', i, 'start', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">End Date</label>
                        <input className="input-field text-sm" placeholder="Present" value={exp.end} onChange={(e) => updateArr<Experience>('experience', i, 'end', e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-slate-500 mb-1 block">Bullet Points</label>
                        <textarea className="textarea-field text-sm h-24" placeholder="• Developed...\n• Led team of..." value={exp.bullets} onChange={(e) => updateArr<Experience>('experience', i, 'bullets', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addArr<Experience>('experience', { company: '', role: '', start: '', end: '', bullets: '' })}
                  className="btn-secondary gap-2 text-xs w-full"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Experience
                </button>
              </motion.div>
            )}

            {/* Projects */}
            {activeSection === 'projects' && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 space-y-4">
                <h2 className="font-semibold text-white text-sm">Projects</h2>
                {data.projects.map((proj, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Project {i + 1}</span>
                      {i > 0 && (
                        <button onClick={() => removeArr('projects', i)} className="text-red-400 hover:text-red-300 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Project Name</label>
                        <input className="input-field text-sm" placeholder="Portfolio Website" value={proj.name} onChange={(e) => updateArr<Project>('projects', i, 'name', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Technologies</label>
                        <input className="input-field text-sm" placeholder="React, Node.js" value={proj.tech} onChange={(e) => updateArr<Project>('projects', i, 'tech', e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-slate-500 mb-1 block">Description</label>
                        <textarea className="textarea-field text-sm h-20" placeholder="Brief description of what you built..." value={proj.description} onChange={(e) => updateArr<Project>('projects', i, 'description', e.target.value)} />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-slate-500 mb-1 block">Link (optional)</label>
                        <input className="input-field text-sm" placeholder="github.com/..." value={proj.link} onChange={(e) => updateArr<Project>('projects', i, 'link', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addArr<Project>('projects', { name: '', tech: '', description: '', link: '' })}
                  className="btn-secondary gap-2 text-xs w-full"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Project
                </button>
              </motion.div>
            )}

            {/* Certifications */}
            {activeSection === 'certifications' && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 space-y-4">
                <h2 className="font-semibold text-white text-sm">Certifications</h2>
                {data.certifications.map((cert, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">Cert {i + 1}</span>
                      {i > 0 && (
                        <button onClick={() => removeArr('certifications', i)} className="text-red-400 hover:text-red-300 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="text-xs text-slate-500 mb-1 block">Certification Name</label>
                        <input className="input-field text-sm" placeholder="AWS Solutions Architect" value={cert.name} onChange={(e) => updateArr<Certification>('certifications', i, 'name', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Issuer</label>
                        <input className="input-field text-sm" placeholder="Amazon Web Services" value={cert.issuer} onChange={(e) => updateArr<Certification>('certifications', i, 'issuer', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Year</label>
                        <input className="input-field text-sm" placeholder="2024" value={cert.year} onChange={(e) => updateArr<Certification>('certifications', i, 'year', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addArr<Certification>('certifications', { name: '', issuer: '', year: '' })}
                  className="btn-secondary gap-2 text-xs w-full"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Certification
                </button>
              </motion.div>
            )}

            {/* Achievements */}
            {activeSection === 'achievements' && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6">
                <h2 className="font-semibold text-white text-sm mb-3">Achievements & Awards</h2>
                <textarea
                  className="textarea-field h-32 text-sm"
                  placeholder="• Dean's List — 2022, 2023&#10;• Hackathon Winner — TechFest 2023&#10;• Google Scholarship Recipient"
                  value={data.achievements}
                  onChange={(e) => update('achievements', e.target.value)}
                />
              </motion.div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="glass-card overflow-hidden sticky top-6 h-fit max-h-[85vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Live Preview</span>
              </div>
              <span className="text-xs text-slate-500 capitalize">{template} template</span>
            </div>
            <div className="overflow-y-auto max-h-[75vh] p-1 bg-white">
              <div
                id="resume-preview"
                className="p-8 text-gray-900 min-h-full"
                style={{ fontFamily: template === 'corporate' ? 'Georgia, serif' : 'Arial, sans-serif' }}
              >
                {/* Name & Contact */}
                <div className="mb-5" style={{ borderBottom: `3px solid ${accent}`, paddingBottom: '12px' }}>
                  <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#111' }}>
                    {data.name || 'Your Name'}
                  </h1>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#555', marginTop: '4px' }}>
                    {data.email && <span>{data.email}</span>}
                    {data.phone && <span>{data.phone}</span>}
                    {data.location && <span>{data.location}</span>}
                    {data.linkedin && <span>{data.linkedin}</span>}
                    {data.github && <span>{data.github}</span>}
                  </div>
                </div>

                {/* Summary */}
                {data.summary && (
                  <div className="mb-4">
                    <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${accent}40`, paddingBottom: '3px', marginBottom: '6px' }}>Summary</h2>
                    <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#333', margin: 0 }}>{data.summary}</p>
                  </div>
                )}

                {/* Skills */}
                {data.skills && (
                  <div className="mb-4">
                    <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${accent}40`, paddingBottom: '3px', marginBottom: '6px' }}>Skills</h2>
                    <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#333', margin: 0 }}>{data.skills}</p>
                  </div>
                )}

                {/* Experience */}
                {data.experience.some((e) => e.company || e.role) && (
                  <div className="mb-4">
                    <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${accent}40`, paddingBottom: '3px', marginBottom: '6px' }}>Experience</h2>
                    {data.experience.map((exp, i) => exp.company || exp.role ? (
                      <div key={i} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <strong style={{ fontSize: '13px', color: '#111' }}>{exp.role || 'Role'}</strong>
                          <span style={{ fontSize: '11px', color: '#777' }}>{exp.start}{exp.end ? ` – ${exp.end}` : ''}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#555', marginBottom: '3px' }}>{exp.company}</div>
                        {exp.bullets && exp.bullets.split('\n').map((b, j) => b.trim() ? (
                          <div key={j} style={{ fontSize: '12px', color: '#333', lineHeight: '1.5', paddingLeft: '12px' }}>{b}</div>
                        ) : null)}
                      </div>
                    ) : null)}
                  </div>
                )}

                {/* Education */}
                {data.education.some((e) => e.school) && (
                  <div className="mb-4">
                    <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${accent}40`, paddingBottom: '3px', marginBottom: '6px' }}>Education</h2>
                    {data.education.map((edu, i) => edu.school ? (
                      <div key={i} style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <strong style={{ fontSize: '13px', color: '#111' }}>{edu.school}</strong>
                          <span style={{ fontSize: '11px', color: '#777' }}>{edu.year}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#555' }}>
                          {edu.degree}{edu.field ? `, ${edu.field}` : ''}{edu.gpa ? ` — GPA: ${edu.gpa}` : ''}
                        </div>
                      </div>
                    ) : null)}
                  </div>
                )}

                {/* Projects */}
                {data.projects.some((p) => p.name) && (
                  <div className="mb-4">
                    <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${accent}40`, paddingBottom: '3px', marginBottom: '6px' }}>Projects</h2>
                    {data.projects.map((proj, i) => proj.name ? (
                      <div key={i} style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
                          <strong style={{ fontSize: '13px', color: '#111' }}>{proj.name}</strong>
                          {proj.tech && <span style={{ fontSize: '11px', color: '#777' }}>| {proj.tech}</span>}
                        </div>
                        {proj.description && <p style={{ fontSize: '12px', color: '#333', lineHeight: '1.5', margin: '2px 0' }}>{proj.description}</p>}
                        {proj.link && <span style={{ fontSize: '11px', color: accent }}>{proj.link}</span>}
                      </div>
                    ) : null)}
                  </div>
                )}

                {/* Certifications */}
                {data.certifications.some((c) => c.name) && (
                  <div className="mb-4">
                    <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${accent}40`, paddingBottom: '3px', marginBottom: '6px' }}>Certifications</h2>
                    {data.certifications.map((cert, i) => cert.name ? (
                      <div key={i} style={{ fontSize: '12px', color: '#333', marginBottom: '4px' }}>
                        <strong>{cert.name}</strong>{cert.issuer ? ` — ${cert.issuer}` : ''}{cert.year ? ` (${cert.year})` : ''}
                      </div>
                    ) : null)}
                  </div>
                )}

                {/* Achievements */}
                {data.achievements && (
                  <div className="mb-4">
                    <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${accent}40`, paddingBottom: '3px', marginBottom: '6px' }}>Achievements</h2>
                    {data.achievements.split('\n').map((line, i) => line.trim() ? (
                      <div key={i} style={{ fontSize: '12px', color: '#333', lineHeight: '1.5' }}>{line}</div>
                    ) : null)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

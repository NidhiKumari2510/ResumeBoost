import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Code,
  Users,
  Heart,
  FileText,
  Briefcase,
} from 'lucide-react';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateInterviewQuestions } from '../services/gemini';
import { extractTextFromFile } from '../utils/fileParser';

interface Question {
  question: string;
  sampleAnswer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tip: string;
}

interface InterviewResult {
  technical: Question[];
  hr: Question[];
  behavioral: Question[];
  resumeBased: Question[];
  roleSpecific: Question[];
}

const categoryConfig = [
  { key: 'technical', label: 'Technical', icon: Code, color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20' },
  { key: 'hr', label: 'HR Questions', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
  { key: 'behavioral', label: 'Behavioral', icon: Heart, color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-400/20' },
  { key: 'resumeBased', label: 'Resume-Based', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
  { key: 'roleSpecific', label: 'Role-Specific', icon: Briefcase, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
];

const difficultyStyle: Record<string, string> = {
  Easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Hard: 'text-red-400 bg-red-400/10 border-red-400/20',
};

function QuestionCard({ q, idx }: { q: Question; idx: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/3 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs text-slate-600 font-mono flex-shrink-0">{String(idx + 1).padStart(2, '0')}</span>
          <p className="text-sm font-medium text-slate-200 leading-snug">{q.question}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyStyle[q.difficulty] || difficultyStyle.Medium}`}>
            {q.difficulty}
          </span>
          {open ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-slate-700/40 pt-3">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Sample Answer</p>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/40 rounded-xl p-3">{q.sampleAnswer}</p>
              </div>
              {q.tip && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-cyan-400/5 border border-cyan-400/10">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-cyan-300/80">{q.tip}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function InterviewPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InterviewResult | null>(null);
  const [activeCategory, setActiveCategory] = useState('technical');

  async function handleGenerate() {
    if (!resumeFile) { toast.error('Please upload your resume.'); return; }
    if (!jobDescription.trim()) { toast.error('Please enter a job description.'); return; }

    setLoading(true);
    setResult(null);
    try {
      const resumeText = await extractTextFromFile(resumeFile);
      if (!resumeText.trim()) throw new Error('Could not extract text from resume.');
      const data = await generateInterviewQuestions(resumeText, jobDescription);
      setResult(data);
      toast.success('Interview questions generated!');
    } catch (err: any) {
      toast.error(err.message || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const activeConfig = categoryConfig.find((c) => c.key === activeCategory);
  const activeQuestions = result ? (result as any)[activeCategory] as Question[] : [];
  const totalQuestions = result
    ? Object.values(result).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0)
    : 0;

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Interview Preparation</h1>
              <p className="text-sm text-slate-500">AI-generated questions with sample answers tailored to your profile</p>
            </div>
          </div>
        </motion.div>

        {/* Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-6 mb-6"
        >
          <div className="glass-card p-6">
            <label className="block text-sm font-semibold text-slate-300 mb-3">Resume</label>
            <FileUpload onFile={(f) => setResumeFile(f)} label="Upload your resume" />
          </div>

          <div className="glass-card p-6">
            <label className="block text-sm font-semibold text-slate-300 mb-3">Job Description</label>
            <textarea
              className="textarea-field h-40"
              placeholder="Paste the job description for the role you're preparing for..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary gap-2 px-8 py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate My Interview Questions
              </>
            )}
          </button>
        </motion.div>

        {loading && <LoadingSpinner message="Gemini AI is crafting your personalized questions..." size="lg" />}

        <AnimatePresence>
          {result && !loading && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Stats */}
              <div className="glass-card p-4 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-white">{totalQuestions} personalized questions generated</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Easy', 'Medium', 'Hard'].map((d) => {
                    const count = Object.values(result).flat().filter((q: any) => q.difficulty === d).length;
                    return (
                      <span key={d} className={`text-xs px-2 py-0.5 rounded-full border ${difficultyStyle[d]}`}>
                        {count} {d}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Category tabs */}
              <div className="glass-card p-2 flex flex-wrap gap-1">
                {categoryConfig.map((cat) => {
                  const questions = (result as any)[cat.key] as Question[];
                  const isActive = activeCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? `${cat.bg} ${cat.color} border`
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <cat.icon className="w-3.5 h-3.5" />
                      {cat.label}
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? '' : 'bg-slate-700 text-slate-400'}`}>
                        {questions?.length || 0}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Questions */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  {activeConfig && (
                    <>
                      <activeConfig.icon className={`w-4 h-4 ${activeConfig.color}`} />
                      <h2 className="font-semibold text-white text-sm">{activeConfig.label} Questions</h2>
                      <span className="text-xs text-slate-500">({activeQuestions?.length || 0})</span>
                    </>
                  )}
                </div>
                {activeQuestions?.map((q, i) => (
                  <QuestionCard key={i} q={q} idx={i} />
                ))}
                {(!activeQuestions || activeQuestions.length === 0) && (
                  <p className="text-sm text-slate-500 text-center py-8">No questions in this category.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

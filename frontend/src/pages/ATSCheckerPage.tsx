import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FileSearch, CheckCircle, XCircle, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import ScoreCircle from '../components/ScoreCircle';
import { analyzeATS } from "../services/atsService";;
import { extractTextFromFile } from '../utils/fileParser';

interface ATSResult {
  atsScore: number;
  keywordMatchPercentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  improvements: string[];
  suggestions: Array<{ title: string; description: string; priority: string }>;
  overallFeedback: string;
}

export default function ATSCheckerPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);

  async function handleAnalyze() {
    if (!resumeFile) { toast.error('Please upload your resume.'); return; }
    if (!jobDescription.trim()) { toast.error('Please enter a job description.'); return; }

    setLoading(true);
    setResult(null);
    try {
      const resumeText = await extractTextFromFile(resumeFile);
      if (!resumeText.trim()) throw new Error('Could not extract text from file. Try a different format.');
      const data = await analyzeATS(resumeText, jobDescription);
      setResult(data);
      toast.success('Analysis complete!');
    } catch (err: any) {
      toast.error(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const priorityColor: Record<string, string> = {
    high: 'text-red-400 bg-red-400/10 border-red-400/20',
    medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  };

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <FileSearch className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">ATS Score Checker</h1>
              <p className="text-sm text-slate-500">Check how your resume performs against ATS filters</p>
            </div>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-6 mb-6"
        >
          <div className="glass-card p-6">
            <label className="block text-sm font-semibold text-slate-300 mb-3">Resume</label>
            <FileUpload
              onFile={(f) => setResumeFile(f)}
              label="Upload your resume"
            />
          </div>

          <div className="glass-card p-6">
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Job Description
            </label>
            <textarea
              className="textarea-field h-40"
              placeholder="Paste the job description here..."
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
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-primary gap-2 px-8 py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze ATS Score
              </>
            )}
          </button>
        </motion.div>

        {/* Loading */}
        {loading && <LoadingSpinner message="Gemini AI is analyzing your resume..." size="lg" />}

        {/* Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Score Row */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex items-center justify-center">
                  <ScoreCircle score={result.atsScore} label="ATS Score" />
                </div>
                <div className="glass-card p-6 flex items-center justify-center">
                  <ScoreCircle score={result.keywordMatchPercentage} label="Keyword Match" size={120} />
                </div>
                <div className="glass-card p-6 flex flex-col justify-center">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Overall Feedback</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{result.overallFeedback}</p>
                </div>
              </div>

              {/* Keywords */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-semibold text-white text-sm">Matched Keywords</h3>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                      {result.matchedKeywords.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedKeywords.map((kw) => (
                      <span key={kw} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-400/8 text-emerald-300 border border-emerald-400/15">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <h3 className="font-semibold text-white text-sm">Missing Keywords</h3>
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-red-400/10 text-red-400 border border-red-400/20">
                      {result.missingKeywords.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map((kw) => (
                      <span key={kw} className="text-xs px-2.5 py-1 rounded-lg bg-red-400/8 text-red-300 border border-red-400/15">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-semibold text-white text-sm">Resume Strengths</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <h3 className="font-semibold text-white text-sm">Areas of Improvement</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {result.improvements.map((imp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggestions */}
              {result.suggestions?.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-white mb-4">AI Suggestions</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {result.suggestions.map((s, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-semibold text-white">{s.title}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${priorityColor[s.priority] || priorityColor.medium}`}>
                            {s.priority}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

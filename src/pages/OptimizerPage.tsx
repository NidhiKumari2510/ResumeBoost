import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Wand2, Copy, Download, RefreshCw, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import ScoreCircle from '../components/ScoreCircle';
import { optimizeResume } from '../services/gemini';
import { extractTextFromFile } from '../utils/fileParser';

interface OptimizeResult {
  optimizedResume: string;
  matchScore: number;
  improvements: Array<{ section: string; original: string; improved: string; reason: string }>;
  addedKeywords: string[];
  summaryFeedback: string;
}

export default function OptimizerPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizeResult | null>(null);

  async function handleOptimize() {
    if (!resumeFile && !resumeText.trim()) { toast.error('Please upload your resume or paste the text.'); return; }
    if (!jobDescription.trim()) { toast.error('Please enter a job description.'); return; }

    setLoading(true);
    setResult(null);
    try {
      let text = resumeText;
      if (resumeFile) text = await extractTextFromFile(resumeFile);
      if (!text.trim()) throw new Error('Could not extract text. Try pasting it directly.');
      const data = await optimizeResume(text, jobDescription);
      setResult(data);
      toast.success('Resume optimized!');
    } catch (err: any) {
      toast.error(err.message || 'Optimization failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function copyOptimized() {
    if (!result) return;
    navigator.clipboard.writeText(result.optimizedResume);
    toast.success('Copied to clipboard!');
  }

  function downloadOptimized() {
    if (!result) return;
    const blob = new Blob([result.optimizedResume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-resume.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded!');
  }

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">AI Resume Optimizer</h1>
              <p className="text-sm text-slate-500">Rewrite, strengthen, and ATS-optimize your resume with AI</p>
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
          <div className="glass-card p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">Resume Upload</label>
              <FileUpload onFile={(f) => setResumeFile(f)} label="Upload your resume" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-slate-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 text-xs text-slate-600 bg-navy-800" style={{ background: 'rgba(9,20,48,0.5)' }}>or paste text</span>
              </div>
            </div>
            <textarea
              className="textarea-field h-36"
              placeholder="Or paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>

          <div className="glass-card p-6">
            <label className="block text-sm font-semibold text-slate-300 mb-3">Job Description</label>
            <textarea
              className="textarea-field h-64"
              placeholder="Paste the job description here to tailor optimization..."
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
            onClick={handleOptimize}
            disabled={loading}
            className="btn-primary gap-2 px-8 py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Optimize My Resume
              </>
            )}
          </button>
        </motion.div>

        {loading && <LoadingSpinner message="Gemini AI is optimizing your resume..." size="lg" />}

        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Score + feedback */}
              <div className="glass-card p-6 flex flex-wrap items-center gap-8">
                <ScoreCircle score={result.matchScore} label="Match Score" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Summary</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{result.summaryFeedback}</p>
                  {result.addedKeywords?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.addedKeywords.map((kw) => (
                        <span key={kw} className="text-xs px-2.5 py-1 rounded-lg bg-cyan-400/8 text-cyan-300 border border-cyan-400/15">
                          +{kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Resume comparison */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Optimized Resume</h3>
                  <div className="flex gap-2">
                    <button onClick={handleOptimize} className="btn-secondary gap-1.5 text-xs px-3 py-2">
                      <RefreshCw className="w-3.5 h-3.5" />
                      Regenerate
                    </button>
                    <button onClick={copyOptimized} className="btn-secondary gap-1.5 text-xs px-3 py-2">
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </button>
                    <button onClick={downloadOptimized} className="btn-primary gap-1.5 text-xs px-3 py-2">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                </div>
                <pre className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans bg-slate-900/50 rounded-xl p-4 max-h-96 overflow-y-auto">
                  {result.optimizedResume}
                </pre>
              </div>

              {/* Improvements panel */}
              {result.improvements?.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-white mb-4">What Changed</h3>
                  <div className="space-y-4">
                    {result.improvements.map((imp, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20">
                            {imp.section}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-slate-500 mb-1.5 font-medium">Before</p>
                            <p className="text-xs text-slate-400 bg-red-500/5 border border-red-500/10 rounded-lg p-2.5 leading-relaxed">
                              {imp.original}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1.5 font-medium flex items-center gap-1">
                              After <ArrowRight className="w-3 h-3 text-emerald-400" />
                            </p>
                            <p className="text-xs text-slate-300 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2.5 leading-relaxed">
                              {imp.improved}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-slate-500">{imp.reason}</p>
                        </div>
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

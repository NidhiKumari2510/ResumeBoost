import { motion } from 'framer-motion';
import {
  History,
  FileSearch,
  Wand2,
  MessageSquare,
  Eye,
  Download,
  Calendar,
  TrendingUp,
} from 'lucide-react';

const atsReports = [
  {
    id: 1,
    resume: 'June_Resume.pdf',
    role: 'Frontend Developer Intern',
    score: 87,
    date: '15 Jun 2026',
  },
  {
    id: 2,
    resume: 'Resume_V2.pdf',
    role: 'Software Engineer Intern',
    score: 82,
    date: '13 Jun 2026',
  },
];

const optimizations = [
  {
    id: 1,
    title: 'Frontend Developer Resume',
    score: 91,
    date: '2 days ago',
  },
  {
    id: 2,
    title: 'SDE Internship Resume',
    score: 88,
    date: '5 days ago',
  },
];

const interviews = [
  {
    id: 1,
    role: 'Frontend Developer Intern',
    questions: 15,
    difficulty: 'Medium',
    date: 'Yesterday',
  },
  {
    id: 2,
    role: 'Software Engineer Intern',
    questions: 20,
    difficulty: 'Hard',
    date: '3 days ago',
  },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <History className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="font-display text-2xl font-bold text-white">
                History
              </h1>
              <p className="text-sm text-slate-500">
                Review your ATS analyses, resume optimizations, and interview
                sessions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5">
            <FileSearch className="w-5 h-5 text-cyan-400 mb-3" />
            <p className="text-2xl font-bold text-white">24</p>
            <p className="text-sm text-slate-500">ATS Reports</p>
          </div>

          <div className="glass-card p-5">
            <Wand2 className="w-5 h-5 text-violet-400 mb-3" />
            <p className="text-2xl font-bold text-white">18</p>
            <p className="text-sm text-slate-500">Optimizations</p>
          </div>

          <div className="glass-card p-5">
            <MessageSquare className="w-5 h-5 text-emerald-400 mb-3" />
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-sm text-slate-500">Interviews</p>
          </div>

          <div className="glass-card p-5">
            <TrendingUp className="w-5 h-5 text-yellow-400 mb-3" />
            <p className="text-2xl font-bold text-white">84%</p>
            <p className="text-sm text-slate-500">Avg ATS Score</p>
          </div>
        </div>

        {/* ATS Reports */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-5">
            ATS Reports
          </h2>

          <div className="space-y-3">
            {atsReports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30"
              >
                <div>
                  <p className="text-white font-medium">{report.resume}</p>
                  <p className="text-sm text-slate-500">{report.role}</p>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-cyan-400 font-semibold">
                    {report.score}%
                  </span>

                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    {report.date}
                  </div>

                  <button className="btn-secondary gap-2 px-3 py-2 text-xs">
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Optimizations */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-5">
            Resume Optimizations
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {optimizations.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/30"
              >
                <h3 className="text-white font-medium mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-cyan-400 mb-1">
                  Match Score: {item.score}%
                </p>

                <p className="text-sm text-slate-500 mb-4">
                  Optimized {item.date}
                </p>

                <div className="flex gap-2">
                  <button className="btn-secondary text-xs px-3 py-2">
                    View
                  </button>

                  <button className="btn-primary gap-2 text-xs px-3 py-2">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interview Sessions */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-5">
            Interview Sessions
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {interviews.map((session) => (
              <div
                key={session.id}
                className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/30"
              >
                <h3 className="text-white font-medium mb-2">
                  {session.role}
                </h3>

                <p className="text-sm text-slate-400">
                  {session.questions} Questions Generated
                </p>

                <p className="text-sm text-cyan-400 mt-1">
                  Difficulty: {session.difficulty}
                </p>

                <p className="text-sm text-slate-500 mt-2">
                  Created {session.date}
                </p>

                <button className="btn-primary mt-4 text-xs px-3 py-2">
                  Review Questions
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
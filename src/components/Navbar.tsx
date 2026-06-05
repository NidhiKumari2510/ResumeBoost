import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileSearch,
  Wand2,
  FileEdit,
  MessageSquare,
  Zap,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/ats-checker', icon: FileSearch, label: 'ATS Checker' },
  { to: '/optimizer', icon: Wand2, label: 'Resume Optimizer' },
  { to: '/builder', icon: FileEdit, label: 'Resume Builder' },
  { to: '/interview', icon: MessageSquare, label: 'Interview Prep' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 z-40 glass border-r border-cyan-500/10">
        <div className="p-6 border-b border-cyan-500/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-base leading-none">ResumeBoost</h1>
              <p className="text-cyan-400 text-xs font-medium mt-0.5">AI</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-cyan-500/10">
          <div className="glass-card p-3">
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by <span className="text-cyan-400 font-medium">Gemini AI</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">v1.0 — MVP</p>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-cyan-500/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-white text-sm">ResumeBoost AI</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="lg:hidden fixed inset-0 z-40 pt-14"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="relative glass h-full w-64 p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </>
  );
}

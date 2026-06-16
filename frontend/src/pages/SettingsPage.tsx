import { motion } from 'framer-motion';
import {
  Settings,
  User,
  Mail,
  Bell,
  Moon,
  Shield,
  KeyRound,
  Trash2,
  Save,
  Brain,
} from 'lucide-react';

export default function SettingsPage() {
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
              <Settings className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="font-display text-2xl font-bold text-white">
                Settings
              </h1>
              <p className="text-sm text-slate-500">
                Manage your account preferences and application settings.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <User className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">
                Profile Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  defaultValue="Nidhi Kumari"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  defaultValue="nidhi@example.com"
                  className="input-field w-full"
                />
              </div>
            </div>

            <button className="btn-primary mt-5 gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">
                Preferences
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40">
                <div>
                  <p className="text-white font-medium">
                    Email Notifications
                  </p>
                  <p className="text-sm text-slate-500">
                    Receive updates and reminders.
                  </p>
                </div>

                <input type="checkbox" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40">
                <div>
                  <p className="text-white font-medium">
                    Weekly Resume Insights
                  </p>
                  <p className="text-sm text-slate-500">
                    Get AI-powered resume recommendations.
                  </p>
                </div>

                <input type="checkbox" defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40">
                <div>
                  <p className="text-white font-medium">
                    Dark Mode
                  </p>
                  <p className="text-sm text-slate-500">
                    Toggle application theme.
                  </p>
                </div>

                <Moon className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </motion.div>

          {/* AI Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Brain className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">
                AI Preferences
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Preferred AI Model
                </label>

                <select className="input-field w-full">
                  <option>Gemini 2.5 Flash</option>
                  <option>Gemini 2.5 Pro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Default Interview Difficulty
                </label>

                <select className="input-field w-full">
                  <option>Easy</option>
                  <option selected>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">
                Security
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="btn-secondary gap-2">
                <KeyRound className="w-4 h-4" />
                Change Password
              </button>

              <button className="btn-secondary gap-2">
                <Mail className="w-4 h-4" />
                Reset Password
              </button>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 border border-red-500/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <Trash2 className="w-5 h-5 text-red-400" />
              <h2 className="text-lg font-semibold text-red-400">
                Danger Zone
              </h2>
            </div>

            <p className="text-sm text-slate-500 mb-4">
              Deleting your account will permanently remove all ATS reports,
              resume optimizations, and interview sessions.
            </p>

            <button className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors">
              Delete Account
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, Zap } from "lucide-react";
import { useState, useContext } from "react";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const data = await loginUser(
        email,
        password
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );
      }

      setUser(data.user);

      toast.success("Login successful");

      navigate("/");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <LogIn className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="font-display text-2xl font-bold text-white">
                Welcome Back
              </h1>

              <p className="text-sm text-slate-500">
                Sign in to continue your AI-powered career journey
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Land More Interviews with AI
            </h2>

            <p className="text-slate-400 leading-relaxed mb-6">
              Optimize resumes, improve ATS scores,
              and prepare smarter for interviews
              using ResumeBoost AI.
            </p>

            <div className="space-y-3">
              {[
                "ATS Resume Analysis",
                "AI Resume Optimization",
                "Interview Question Generator",
                "Professional Resume Builder",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />

                  <span className="text-slate-300 text-sm">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="glass-card p-3 text-center">
                <p className="text-xl font-bold text-cyan-400">
                  10K+
                </p>

                <p className="text-xs text-slate-500">
                  Users
                </p>
              </div>

              <div className="glass-card p-3 text-center">
                <p className="text-xl font-bold text-cyan-400">
                  50K+
                </p>

                <p className="text-xs text-slate-500">
                  Analyses
                </p>
              </div>

              <div className="glass-card p-3 text-center">
                <p className="text-xl font-bold text-cyan-400">
                  95%
                </p>

                <p className="text-xs text-slate-500">
                  Satisfaction
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">
                Sign In
              </h2>

              <p className="text-sm text-slate-500">
                Enter your credentials to
                continue.
              </p>
            </div>

            <form
              className="space-y-4"
              onSubmit={handleLogin}
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-field pl-10"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />

                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="input-field pl-10"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
              >
                Sign In
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-[#091430] px-3 text-xs text-slate-500">
                    OR
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn-secondary w-full justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Continue with Google
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
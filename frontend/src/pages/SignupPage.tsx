import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );
      return;
    }

    try {
      await registerUser(
        name,
        email,
        password
      );

      toast.success(
        "Account created successfully"
      );

      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: -16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="font-display text-2xl font-bold text-white">
                Create Account
              </h1>

              <p className="text-sm text-slate-500">
                Start building smarter
                resumes and preparing
                for better interviews
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="glass-card p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Your AI Career Assistant
            </h2>

            <p className="text-slate-400 leading-relaxed mb-6">
              ResumeBoost AI helps
              students and
              professionals optimize
              resumes, improve ATS
              compatibility, and
              prepare for interviews
              using Gemini AI.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                "ATS Analysis",
                "Resume Optimization",
                "Interview Prep",
                "Resume Builder",
              ].map((item) => (
                <div
                  key={item}
                  className="glass-card p-4 text-center"
                >
                  <p className="text-sm text-cyan-400 font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl border border-cyan-500/10 bg-cyan-500/5">
              <h3 className="text-white font-semibold mb-2">
                Why Join
                ResumeBoost AI?
              </h3>

              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  ✓ Improve ATS
                  compatibility
                  instantly
                </li>
                <li>
                  ✓ Tailor resumes
                  to job
                  descriptions
                </li>
                <li>
                  ✓ Generate
                  personalized
                  interview
                  questions
                </li>
                <li>
                  ✓ Build
                  professional
                  resumes faster
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="glass-card p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">
                Create Your
                Account
              </h2>

              <p className="text-sm text-slate-500">
                Join ResumeBoost AI
                and accelerate your
                career growth.
              </p>
            </div>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className="input-field pl-10"
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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />

                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={
                      confirmPassword
                    }
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
              >
                Create Account
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
                Continue with
                Google
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have an
                account?{" "}
                <Link
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
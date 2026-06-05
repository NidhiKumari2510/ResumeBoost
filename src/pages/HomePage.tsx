import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileSearch,
  Wand2,
  FileEdit,
  MessageSquare,
  CheckCircle,
  Star,
  Zap,
  Upload,
  Brain,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: FileSearch,
    title: 'ATS Score Checker',
    description: 'Get an instant ATS compatibility score and see exactly which keywords you\'re missing.',
    to: '/ats-checker',
    color: 'from-cyan-400 to-blue-500',
    glow: 'rgba(34,211,238,0.2)',
  },
  {
    icon: Wand2,
    title: 'Resume Optimizer',
    description: 'AI rewrites your bullet points, strengthens your language, and boosts your ATS score.',
    to: '/optimizer',
    color: 'from-blue-400 to-violet-500',
    glow: 'rgba(96,165,250,0.2)',
  },
  {
    icon: FileEdit,
    title: 'Resume Builder',
    description: 'Build a polished resume from scratch with professional templates and live preview.',
    to: '/builder',
    color: 'from-emerald-400 to-cyan-500',
    glow: 'rgba(52,211,153,0.2)',
  },
  {
    icon: MessageSquare,
    title: 'Interview Preparation',
    description: 'Get personalized interview questions with sample answers based on your resume and role.',
    to: '/interview',
    color: 'from-amber-400 to-orange-500',
    glow: 'rgba(251,191,36,0.2)',
  },
];

const steps = [
  { icon: Upload, step: '01', title: 'Upload Resume', desc: 'Upload your existing resume in PDF, DOCX, or text format.' },
  { icon: FileSearch, step: '02', title: 'Paste Job Description', desc: 'Add the job description for your target role.' },
  { icon: Brain, step: '03', title: 'AI Analyzes Profile', desc: 'Gemini AI deeply analyzes your resume against the job requirements.' },
  { icon: Sparkles, step: '04', title: 'Get Personalized Results', desc: 'Receive actionable insights, scores, and tailored improvements.' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer at Google',
    avatar: 'PS',
    text: 'ResumeBoost AI helped me increase my ATS score from 42 to 87. I landed interviews at 3 FAANG companies within a week!',
    rating: 5,
  },
  {
    name: 'Arjun Mehta',
    role: 'Data Analyst at Deloitte',
    avatar: 'AM',
    text: 'The interview prep feature is incredible. The AI-generated questions were almost exactly what I was asked in real interviews.',
    rating: 5,
  },
  {
    name: 'Sara Kim',
    role: 'Product Manager at Stripe',
    avatar: 'SK',
    text: 'I\'d been job hunting for months with zero callbacks. After optimizing my resume with this tool, I got 5 calls in 2 days.',
    rating: 5,
  },
];

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['3 ATS scans/month', 'Basic optimization', '10 interview questions', 'Resume builder'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    features: ['Unlimited ATS scans', 'Full AI optimization', 'Unlimited interview prep', 'Premium templates', 'Priority support'],
    cta: 'Start Pro Trial',
    highlight: true,
  },
  {
    name: 'Teams',
    price: '$49',
    period: '/month',
    features: ['Everything in Pro', '5 team seats', 'Career coaching', 'Custom templates', 'Analytics dashboard'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-0">
        {/* Background */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(34,211,238,0.12) 0%, transparent 70%)',
        }} />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
            style={{
              background: 'rgba(34,211,238,0.08)',
              border: '1px solid rgba(34,211,238,0.2)',
              color: '#22d3ee',
            }}
          >
            <Zap className="w-3 h-3" />
            Powered by Gemini AI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Build Smarter Resumes.{' '}
            <span className="text-gradient block">Crack Better Interviews.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            AI-powered ATS scoring, resume optimization, resume building, and interview preparation — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/ats-checker" className="btn-primary gap-2 text-base px-8 py-4">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/ats-checker" className="btn-secondary gap-2 text-base px-8 py-4">
              <FileSearch className="w-4 h-4" />
              Try ATS Checker
            </Link>
          </motion.div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative"
          >
            <div className="glass-card p-6 max-w-3xl mx-auto glow-cyan">
              <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                {[
                  { label: 'ATS Score Boost', value: '+45%', color: 'text-cyan-400' },
                  { label: 'Interview Calls', value: '3x more', color: 'text-blue-400' },
                  { label: 'Students Helped', value: '10,000+', color: 'text-emerald-400' },
                  { label: 'Templates', value: '3 styles', color: 'text-amber-400' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`text-2xl font-bold font-display ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating accent cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2 glass-card px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-xs text-slate-300 font-medium whitespace-nowrap">ATS Score: 92/100</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 glass-card px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-xs text-slate-300 font-medium whitespace-nowrap">12 keywords matched</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">Features</p>
            <h2 className="section-title">Everything You Need to Land Your Dream Job</h2>
            <p className="section-subtitle mx-auto text-center mt-4">
              Four powerful AI-driven tools designed to supercharge your job search from start to finish.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={f.to}
                  className="glass-card p-6 flex gap-4 group hover:border-cyan-500/30 transition-all duration-300 block"
                  style={{ boxShadow: `0 0 0 0 ${f.glow}` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${f.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${f.glow}`;
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{f.title}</h3>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">{f.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,211,238,0.04) 0%, transparent 70%)',
        }} />
        <div className="max-w-5xl mx-auto relative">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">How It Works</p>
            <h2 className="section-title">From Upload to Offer in 4 Steps</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-cyan-500/30 to-transparent -translate-y-1/2 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div className="text-xs font-bold text-cyan-400/60 mb-2 font-display">{s.step}</div>
                  <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">Testimonials</p>
            <h2 className="section-title">Loved by Students & Professionals</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-cyan-400">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)',
        }} />
        <div className="max-w-4xl mx-auto relative">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">Pricing</p>
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle mx-auto text-center">Start free, upgrade when you're ready to supercharge your job search.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card p-6 flex flex-col gap-5 relative ${plan.highlight ? 'border-cyan-500/40' : ''}`}
                style={plan.highlight ? { boxShadow: '0 0 40px rgba(34,211,238,0.1)' } : {}}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-white">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-bold font-display text-white">{plan.price}</span>
                    <span className="text-slate-500 text-sm">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={plan.highlight ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-white">ResumeBoost AI</span>
                <p className="text-xs text-slate-600">Build smarter. Land faster.</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <Link to="/ats-checker" className="hover:text-cyan-400 transition-colors">ATS Checker</Link>
              <Link to="/optimizer" className="hover:text-cyan-400 transition-colors">Optimizer</Link>
              <Link to="/builder" className="hover:text-cyan-400 transition-colors">Builder</Link>
              <Link to="/interview" className="hover:text-cyan-400 transition-colors">Interview Prep</Link>
            </div>
            <p className="text-xs text-slate-600">© 2024 ResumeBoost AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ message = 'Analyzing with AI...', size = 'md' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="relative">
        <motion.div
          className={`${sizes[size]} rounded-full border-2 border-cyan-400/20`}
          style={{ borderTopColor: '#22d3ee' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className={`absolute inset-1 rounded-full border-2 border-blue-400/20`}
          style={{ borderBottomColor: '#60a5fa' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-slate-400"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

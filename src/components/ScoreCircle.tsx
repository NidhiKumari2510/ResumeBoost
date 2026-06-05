import { motion } from 'framer-motion';

interface ScoreCircleProps {
  score: number;
  size?: number;
  label?: string;
}

export default function ScoreCircle({ score, size = 140, label = 'ATS Score' }: ScoreCircleProps) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const color =
    score >= 80 ? '#10b981' :
    score >= 60 ? '#22d3ee' :
    score >= 40 ? '#f59e0b' :
    '#ef4444';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={10}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              filter: `drop-shadow(0 0 8px ${color}80)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="text-3xl font-bold font-display"
            style={{ color }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-slate-500">/ 100</span>
        </div>
      </div>
      <p className="text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}

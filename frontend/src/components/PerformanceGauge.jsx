import { Info } from 'lucide-react';

export default function PerformanceGauge({ results }) {
  // Calculate dynamic score based on audited results
  let score = 100;
  if (!results) {
    score = 68;
  } else {
    if (!results.metaDescription) score -= 15;
    if (results.imagesWithoutAlt > 0) score -= Math.min(25, results.imagesWithoutAlt * 2);
    if (results.responseTime > 1000) score -= Math.min(20, Math.floor((results.responseTime - 1000) / 150));
    if (results.h1Count === 0) score -= 10;
  }
  score = Math.max(30, Math.min(98, score));

  const strokeDashoffset = 251.2 - (251.2 * score) / 100;

  return (
    <div className="cyber-card p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span>Performance Overview</span>
          <Info className="w-3.5 h-3.5 text-slate-500" />
        </div>
      </div>

      {/* Circle Ring Gauge & Score Info */}
      <div className="flex items-center gap-6 my-auto">
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Ring */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#1C1635"
              strokeWidth="8"
              fill="none"
            />
            {/* Glowing Active Progress Ring */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444'}
              strokeWidth="8"
              fill="none"
              strokeDasharray="251.2"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-white">{score}</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">/ 100</span>
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Overall Score
          </span>
          <h3 className="text-xl font-bold text-amber-400 mt-0.5">
            {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work'}
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Your page has good content but needs performance improvements.
          </p>
        </div>
      </div>
    </div>
  );
}

import { Info } from 'lucide-react';

export default function ResultCard({
  title,
  value,
  badge,
  subtitle,
  valueColor = 'text-white',
  watermark,
  sparkline,
  waveColor,
  icon: IconComponent
}) {
  return (
    <div className="cyber-card p-5 relative overflow-hidden flex flex-col justify-between group min-h-[170px]">
      {/* Background Watermark Icon or Letter */}
      {watermark && typeof watermark === 'string' && watermark.length <= 3 && (
        <div className="absolute top-2 right-4 text-slate-700/20 text-6xl font-black select-none pointer-events-none group-hover:text-purple-500/10 transition-colors">
          {watermark}
        </div>
      )}

      {/* Header Row */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <span>{title}</span>
          <Info className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors" />
        </div>
        {IconComponent && (
          <div className="text-slate-600 group-hover:text-purple-400 transition-colors">
            <IconComponent className="w-5 h-5 opacity-40" />
          </div>
        )}
      </div>

      {/* Main Value Display */}
      <div className="my-2 z-10">
        <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${valueColor} line-clamp-2`}>
          {value}
        </div>

        {/* Badge below value */}
        {badge && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border" style={{ backgroundColor: badge.bg, color: badge.text, borderColor: badge.border }}>
            <span>{badge.label}</span>
          </div>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs font-medium text-slate-400 mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {/* Sparkline background graphic for Word Count */}
      {sparkline && (
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none" fill="none">
            <path
              d="M0,50 Q40,40 80,45 T160,25 T240,30 T300,10"
              stroke="#10B981"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M0,50 Q40,40 80,45 T160,25 T240,30 T300,10 L300,60 L0,60 Z"
              fill="url(#greenGradient)"
              opacity="0.25"
            />
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Highlighted node dot */}
            <circle cx="240" cy="30" r="4" fill="#10B981" stroke="#0F0C21" strokeWidth="2" />
          </svg>
        </div>
      )}

      {/* Subtle wave line graphic for HTTP Status or Response Time */}
      {waveColor && !sparkline && (
        <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
          <svg className="w-full h-full" viewBox="0 0 300 40" preserveAspectRatio="none" fill="none">
            <path
              d="M0,25 Q75,10 150,30 T300,15"
              stroke={waveColor}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

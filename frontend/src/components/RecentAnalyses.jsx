import { Info, Globe } from 'lucide-react';

export default function RecentAnalyses({ onSelectUrl }) {
  // Mock default history matching reference image
  const defaultHistory = [
    { domain: 'github.com', status: 200, time: '1.21 s', ago: '2h ago' },
    { domain: 'spring.io', status: 200, time: '1.02 s', ago: '5h ago' },
    { domain: 'openai.com', status: 200, time: '2.31 s', ago: '1d ago' },
    { domain: 'example.com', status: 200, time: '0.45 s', ago: '2d ago' },
  ];

  return (
    <div className="cyber-card p-6 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <span>Recent Analyses</span>
            <Info className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <button className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">
            View all
          </button>
        </div>

        {/* List of Recent Audits */}
        <div className="space-y-2.5">
          {defaultHistory.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelectUrl && onSelectUrl(`https://${item.domain}`)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-[#15112E] transition-colors cursor-pointer text-xs group"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {item.domain}
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <span className="font-bold text-emerald-400">{item.status}</span>
                <span className="text-slate-400 font-medium">{item.time}</span>
                <span className="text-slate-500">{item.ago}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

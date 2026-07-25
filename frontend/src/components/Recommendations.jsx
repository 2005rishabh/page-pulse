import { Info, Image, FileText, Zap, ArrowRight } from 'lucide-react';

export default function Recommendations({ results }) {
  // Generate recommendations dynamically from audit results
  const recommendations = [];

  if (!results || results.imagesWithoutAlt > 0) {
    recommendations.push({
      id: 'images',
      icon: Image,
      title: 'Optimize images',
      desc: `${results ? results.imagesWithoutAlt : 27} images are missing alt text`,
      priority: 'High',
      badgeColor: 'bg-red-950/60 text-red-400 border-red-800/40'
    });
  }

  if (!results || !results.metaDescription) {
    recommendations.push({
      id: 'meta',
      icon: FileText,
      title: 'Add meta description',
      desc: 'Improve search engine visibility',
      priority: 'Medium',
      badgeColor: 'bg-amber-950/60 text-amber-400 border-amber-800/40'
    });
  }

  if (!results || results.responseTime > 1000) {
    recommendations.push({
      id: 'speed',
      icon: Zap,
      title: 'Reduce response time',
      desc: 'Server response is slow',
      priority: 'Medium',
      badgeColor: 'bg-amber-950/60 text-amber-400 border-amber-800/40'
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: 'good',
      icon: Zap,
      title: 'Great job!',
      desc: 'No critical SEO or accessibility issues detected.',
      priority: 'Low',
      badgeColor: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
    });
  }

  return (
    <div className="cyber-card p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <span>Key Recommendations</span>
            <Info className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>

        <div className="space-y-3">
          {recommendations.slice(0, 3).map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#14102B] border border-[#231C45] hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/40 border border-purple-800/30 flex items-center justify-center text-purple-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-snug">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 font-normal">{item.desc}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.badgeColor}`}>
                  {item.priority}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#1C1635]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors"
        >
          <span>View full report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

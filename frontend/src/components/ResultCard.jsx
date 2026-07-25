import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ResultCard({ icon: Icon, title, value, badge, color = 'blue' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
  };

  const textColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    orange: 'text-orange-600 dark:text-orange-400',
    red: 'text-red-600 dark:text-red-400'
  };

  return (
    <div className={`border rounded-xl p-6 ${colorClasses[color]} card-hover group`}>
      <div className="flex items-start justify-between mb-4">
        <Icon className={`w-6 h-6 ${textColorClasses[color]}`} />
        {badge && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.color}`}>
            {badge.text}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{title}</p>
      <div className="flex items-center justify-between mt-2 gap-2">
        <p className="text-2xl font-bold text-slate-900 dark:text-white break-words">{value}</p>
        {typeof value === 'string' && value.length > 0 && (
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/50 dark:hover:bg-slate-700/50 rounded-lg transition-all"
            title="Copy to clipboard"
            aria-label="Copy value"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

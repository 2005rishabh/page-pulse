import { AlertTriangle, X } from 'lucide-react';

export default function ErrorAlert({ message, onDismiss }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-red-950/40 border border-red-800/60 rounded-xl p-4 flex items-start gap-3 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-bold text-sm text-red-300">Analysis Error</h3>
          <p className="text-xs text-red-300/90 mt-0.5">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-200 transition-colors p-1 rounded-lg hover:bg-red-900/40"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

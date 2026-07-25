import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin">
        <Loader2 className="w-8 h-8 text-blue-500" />
      </div>
      <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm">Analyzing website...</p>
    </div>
  );
}

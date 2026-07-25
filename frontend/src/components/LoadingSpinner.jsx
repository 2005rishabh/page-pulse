import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin text-purple-500">
        <Loader2 className="w-10 h-10 stroke-[2.5]" />
      </div>
      <p className="text-slate-300 font-semibold mt-4 text-sm tracking-wide">
        Analyzing website content...
      </p>
    </div>
  );
}

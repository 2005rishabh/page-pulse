import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-[#1C1635] text-center text-xs text-slate-400">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span>© {new Date().getFullYear()} Page Pulse. All rights reserved.</span>
        <span className="text-slate-600">•</span>
        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 hover:underline font-semibold transition-colors"
        >
          Built for Digital Heroes Training Task
        </a>
      </div>
    </footer>
  );
}

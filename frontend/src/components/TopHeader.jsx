import { Moon, Sun } from 'lucide-react';

export default function TopHeader({ darkMode, setDarkMode }) {
  return (
    <header className="h-16 border-b border-[#1E1838] px-8 flex items-center justify-end gap-4 bg-[#090713]/80 backdrop-blur-md sticky top-0 z-40">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="w-9 h-9 rounded-full bg-[#15112D] border border-[#261E47] flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-500/40 transition-all"
        aria-label="Toggle theme"
      >
        {darkMode ? <Moon className="w-4 h-4 text-purple-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
      </button>

      {/* User Avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 border border-purple-400/40 flex items-center justify-center text-white text-sm font-bold shadow-[0_0_12px_rgba(124,58,237,0.4)] cursor-pointer hover:scale-105 transition-transform">
        R
      </div>
    </header>
  );
}

import { LayoutDashboard, History, BarChart3, Zap, Moon, Sun, Rocket, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar({ activeTab = 'dashboard', onTabChange, darkMode, setDarkMode }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'history', label: 'History', icon: History },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-[#0C0A1B] border-r border-[#1E1838] min-h-screen flex flex-col justify-between p-5 select-none shrink-0">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-none">
              Page Pulse
            </h1>
            <p className="text-[11px] font-medium text-slate-400 mt-1">
              Analyze. Optimize. Perform.
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="mt-8 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange && onTabChange(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] border border-purple-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#16122D]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls & Digital Heroes Promo Card */}
      <div className="space-y-4 pt-4 border-t border-[#1E1838]">
        {/* Theme Switcher Pill */}
        <div className="bg-[#141029] p-1 rounded-xl border border-[#231C44] flex items-center gap-1">
          <button
            onClick={() => setDarkMode(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              darkMode
                ? 'bg-[#211A42] text-white shadow-sm border border-purple-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => setDarkMode(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              !darkMode
                ? 'bg-[#211A42] text-white shadow-sm border border-purple-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light</span>
          </button>
        </div>

        {/* Digital Heroes Credit Rocket Card */}
        <div className="cyber-card p-4 bg-gradient-to-b from-[#130E2B] to-[#0D091F] border border-[#281F4B] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full blur-xl group-hover:bg-purple-600/20 transition-all pointer-events-none" />
          
          <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-3 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Rocket className="w-5 h-5 text-purple-400" />
          </div>

          <p className="text-xs font-medium text-slate-400 leading-snug">
            Built for
          </p>
          <p className="text-sm font-bold text-white tracking-tight mt-0.5">
            Digital Heroes
          </p>
          <p className="text-[11px] text-slate-400 mb-3">
            Training Task
          </p>

          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 text-purple-300 rounded-lg text-xs font-semibold transition-all group-hover:border-purple-400"
          >
            <span>digitalheroesco.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
}

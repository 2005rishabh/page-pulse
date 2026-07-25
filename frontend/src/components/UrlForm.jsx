import { Link2, ArrowRight, CheckCircle2, Clock, Zap } from 'lucide-react';

export default function UrlForm({ onSubmit, loading, results, currentUrl }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    if (url && url.trim()) {
      onSubmit(url.trim());
    }
  };

  return (
    <div className="relative mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Headline & Input */}
        <div className="lg:col-span-8 space-y-5">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Analyze Any <span className="gradient-text">Website Instantly</span> ✨
            </h1>
            <p className="text-slate-400 text-base sm:text-lg mt-2 font-normal">
              Get insights on performance, SEO, accessibility and content in seconds.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative flex items-center bg-[#0F0C21] border border-[#2B2154] focus-within:border-purple-500/80 rounded-2xl p-2 shadow-[0_0_30px_rgba(15,12,33,0.9)] transition-all">
              <div className="pl-3 pr-2 text-slate-400">
                <Link2 className="w-5 h-5 text-purple-400" />
              </div>
              <input
                type="text"
                name="url"
                defaultValue={currentUrl || ''}
                placeholder="https://example.com"
                className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base px-2 py-3 focus:outline-none font-medium"
                disabled={loading}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="gradient-button text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 shrink-0 transition-all disabled:opacity-50"
              >
                <span>{loading ? 'Analyzing...' : 'Analyze Website'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Status Line */}
          {results && (
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 text-purple-300 bg-purple-950/40 px-3 py-1.5 rounded-lg border border-purple-800/40">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Analysis completed successfully</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 bg-[#161132] px-3 py-1.5 rounded-lg border border-[#281F4D]">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Took {(results.responseTime / 1000).toFixed(2)} seconds</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Translucent 3D Graphic */}
        <div className="hidden lg:block lg:col-span-4 relative">
          <div className="relative w-full h-48 rounded-2xl bg-gradient-to-br from-[#1A133A]/80 to-[#0F0B24]/90 border border-[#2F245D] p-5 overflow-hidden shadow-[0_0_35px_rgba(124,58,237,0.25)] backdrop-blur-xl group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />

            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 300 200" fill="none">
              <path d="M0,150 Q75,90 150,130 T300,100" stroke="#8B5CF6" strokeWidth="3" fill="none" />
              <path d="M0,170 Q75,120 150,150 T300,120" stroke="#6366F1" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            </svg>

            <div className="absolute top-4 right-4 w-44 h-36 bg-gradient-to-br from-purple-500/20 to-indigo-600/30 backdrop-blur-2xl border border-purple-400/40 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform rotate-3 group-hover:rotate-0 transition-transform duration-300 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="w-5 h-5 rounded-md bg-purple-400/20 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-purple-300" />
                </div>
              </div>

              <div className="my-auto flex justify-center items-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.7)] animate-pulse">
                  <Zap className="w-7 h-7 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

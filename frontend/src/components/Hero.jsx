import UrlForm from './UrlForm';

export default function Hero({ onAnalyze, loading, validationError }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 animate-slideUp">
            Page Pulse
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-3 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Analyze any website instantly.
          </p>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
            Discover response time, page title, SEO metadata, heading structure, accessibility issues and more.
          </p>
        </div>

        <div className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
          <UrlForm
            onSubmit={onAnalyze}
            loading={loading}
            validationError={validationError}
          />
        </div>
      </div>
    </div>
  );
}

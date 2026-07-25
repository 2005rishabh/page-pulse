import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

export default function UrlForm({ onSubmit, loading, validationError }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    onSubmit(url);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="flex-1">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              name="url"
              placeholder="https://example.com"
              className={`w-full px-4 py-3 sm:py-4 rounded-lg border-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all ${
                validationError
                  ? 'border-red-500 dark:border-red-500 focus:ring-red-200 dark:focus:ring-red-900'
                  : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900'
              }`}
              disabled={loading}
              onKeyDown={handleKeyDown}
              aria-invalid={validationError ? 'true' : 'false'}
              aria-describedby={validationError ? 'url-error' : undefined}
            />
            <Search className="absolute right-3 top-3.5 sm:top-4 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
          </div>
          {validationError && (
            <p id="url-error" className="text-red-600 dark:text-red-400 text-sm mt-2">
              {validationError}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-all active:scale-95 whitespace-nowrap"
          aria-label={loading ? 'Analyzing...' : 'Analyze website'}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </form>
  );
}

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import UrlForm from '../components/UrlForm';
import ResultGrid from '../components/ResultGrid';
import PerformanceGauge from '../components/PerformanceGauge';
import Recommendations from '../components/Recommendations';
import RecentAnalyses from '../components/RecentAnalyses';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import Footer from '../components/Footer';
import { useAnalyze } from '../hooks/useAnalyze';

export default function Home() {
  const { results, loading, error, validationError, analyze, clearResults } = useAnalyze();
  const [url, setUrl] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  // Sync dark mode class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAnalyze = async (inputUrl) => {
    setUrl(inputUrl);
    await analyze(inputUrl);
  };

  return (
    <div className="flex min-h-screen bg-[#090713] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* Left Navigation Sidebar (Dashboard Only) */}
      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Dashboard Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <TopHeader darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Hero & Audit Input Search Bar */}
          <UrlForm
            onSubmit={handleAnalyze}
            loading={loading}
            results={results}
            currentUrl={url}
          />

          {/* Error Alerts */}
          {validationError && (
            <div className="mb-6">
              <ErrorAlert message={validationError} />
            </div>
          )}

          {error && (
            <div className="mb-6">
              <ErrorAlert message={error} onDismiss={clearResults} />
            </div>
          )}

          {/* Loading State */}
          {loading && <LoadingSpinner />}

          {/* Render Metrics & Cards ONLY when analysis results exist */}
          {results && !loading && (
            <div className="space-y-8 animate-fadeIn">
              {/* Top 7 Metrics Grid */}
              <ResultGrid results={results} />

              {/* Bottom 3 Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PerformanceGauge results={results} />
                <Recommendations results={results} />
                <RecentAnalyses onSelectUrl={handleAnalyze} />
              </div>
            </div>
          )}

          {/* Empty State Instructions when no analysis has been run yet */}
          {!results && !loading && !error && (
            <div className="text-center py-16 text-slate-500 border border-dashed border-[#1E1838] rounded-2xl bg-[#0C0A1B]/50">
              <p className="text-base font-semibold text-slate-400">
                Enter any website URL above to start instant analysis.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Metrics for performance, SEO metadata, heading hierarchy, and accessibility will appear here.
              </p>
            </div>
          )}

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}

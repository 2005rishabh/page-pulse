import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ResultGrid from '../components/ResultGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import Footer from '../components/Footer';
import { useAnalyze } from '../hooks/useAnalyze';
import { Copy, RotateCcw } from 'lucide-react';

export default function Home() {
  const { results, loading, error, validationError, analyze, clearResults } = useAnalyze();
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Load last URL from localStorage on mount
  useEffect(() => {
    const lastUrl = localStorage.getItem('lastUrl');
    if (lastUrl) {
      setUrl(lastUrl);
    }
  }, []);

  const handleAnalyze = async (inputUrl) => {
    setUrl(inputUrl);
    await analyze(inputUrl);
  };

  const handleCopyResults = () => {
    const text = `
Page Title: ${results.pageTitle}
HTTP Status: ${results.httpStatus}
Response Time: ${results.responseTime}ms
Meta Description: ${results.metaDescription || 'N/A'}
H1 Count: ${results.h1Count}
Images without Alt: ${results.imagesWithoutAlt}
Word Count: ${results.wordCount}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setUrl('');
    clearResults();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      <Navbar />

      <main className="flex-1">
        {!results && !loading && !error && (
          <Hero
            onAnalyze={handleAnalyze}
            loading={loading}
            validationError={validationError}
          />
        )}

        {(loading || results || error) && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900"
                  disabled={loading}
                />
                <button
                  onClick={() => handleAnalyze(url)}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-all whitespace-nowrap"
                >
                  {loading ? 'Analyzing...' : 'Analyze'}
                </button>
                <button
                  onClick={handleClear}
                  disabled={loading}
                  className="px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-all"
                  title="Clear results"
                  aria-label="Clear"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {validationError && (
              <div className="mb-6">
                <ErrorAlert message={validationError} />
              </div>
            )}

            {loading && <LoadingSpinner />}

            {error && (
              <div className="mb-6">
                <ErrorAlert message={error} onDismiss={clearResults} />
              </div>
            )}

            {results && !loading && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Analysis Results
                  </h2>
                  <button
                    onClick={handleCopyResults}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-all text-sm font-medium"
                    title="Copy all results"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy Results'}
                  </button>
                </div>
                <ResultGrid results={results} />
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

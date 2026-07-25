import { useState, useCallback } from 'react';
import { analyzeUrl } from '../services/api';
import { validateUrl } from '../utils/validator';

export const useAnalyze = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const analyze = useCallback(async (url) => {
    setValidationError(null);
    setError(null);

    // Validate URL
    const validation = validateUrl(url);
    if (!validation.valid) {
      setValidationError(validation.error);
      setResults(null);
      return;
    }

    setLoading(true);
    const response = await analyzeUrl(url);
    setLoading(false);

    if (response.success) {
      setResults(response.data);
      setError(null);
      // Save to localStorage
      localStorage.setItem('lastUrl', url);
    } else {
      setError(response.error);
      setResults(null);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
    setValidationError(null);
  }, []);

  return {
    results,
    loading,
    error,
    validationError,
    analyze,
    clearResults
  };
};

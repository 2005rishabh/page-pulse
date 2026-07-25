import axios from 'axios';

// Fall back to live Render backend if running on production domain (e.g. Vercel)
const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const defaultBackend = isLocalhost
  ? 'http://localhost:8080/api'
  : 'https://page-pulse-backend-yhsz.onrender.com/api';

let baseUrl = import.meta.env.VITE_API_URL || defaultBackend;
baseUrl = baseUrl.trim();
if (!baseUrl.endsWith('/api')) {
  baseUrl = baseUrl.replace(/\/+$/, '') + '/api';
}

const API_BASE_URL = baseUrl;

export const analyzeUrl = async (url) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze`, { url });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    let errorMessage = 'An error occurred while analyzing the URL';
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 400) {
        errorMessage = data.message || 'Invalid URL format';
      } else if (status === 408) {
        errorMessage = 'Request timeout - the website took too long to respond';
      } else if (status === 415) {
        errorMessage = 'The URL does not return HTML content';
      } else if (status === 502 || status === 503 || status === 504) {
        errorMessage = 'Website is currently unavailable';
      } else if (status >= 500) {
        errorMessage = 'Server error - please try again later';
      } else {
        errorMessage = data.message || `Error: ${status}`;
      }
    } else if (error.request) {
      errorMessage = 'Network error - unable to connect to the server';
    }

    return {
      success: false,
      error: errorMessage
    };
  }
};

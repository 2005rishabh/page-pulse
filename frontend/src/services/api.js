import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

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

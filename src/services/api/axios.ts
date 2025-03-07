import axios from 'axios';
import axiosRetry from 'axios-retry';

// Create a custom axios instance with default config
export const apiClient = axios.create({
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Accept': 'application/json, application/xml',
    'User-Agent': 'ThinkTome/1.0'
  }
});

// Configure retry behavior
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: (retryCount) => {
    return Math.min(1000 * Math.pow(2, retryCount), 10000);
  },
  retryCondition: (error) => {
    // Retry on network errors and 5xx responses
    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
           (error.response?.status && error.response.status >= 500);
  },
  onRetry: (retryCount, error, requestConfig) => {
    console.log(`Retrying request (${retryCount}/3): ${requestConfig.url}`);
  }
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with error status
      console.error('Server Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', {
        message: error.message,
        url: error.config?.url
      });
    } else {
      // Error in request configuration
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);
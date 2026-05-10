import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your real API URL
  timeout: 10000,
});

// Mock interceptor for demo purposes
api.interceptors.request.use(async (config) => {
  // Add token if exists
  return config;
});

export default api;

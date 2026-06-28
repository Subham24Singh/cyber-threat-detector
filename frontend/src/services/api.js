import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export const healthCheck = () => api.get('/health');
export const loginUser = (payload) => api.post('/auth/login', payload);
export const registerUser = (payload) => api.post('/auth/register', payload);
export const detectThreat = (payload) => api.post('/detect', payload);

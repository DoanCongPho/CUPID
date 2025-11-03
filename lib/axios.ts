import axios from 'axios';
import { AppStore } from '@/store/store';

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

const apiClient = axios.create({
  // Replace with your API backend's Base URL
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
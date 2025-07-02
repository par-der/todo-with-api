import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './localstorage.ts';

export const mainConfig = (): AxiosRequestConfig => ({
  headers: {
    'ContentÍ-Type': 'application/json',
  },
});

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Token ${getToken()}`,
  },
});

// apiClient.interceptors.request.use((config) => {
//   const token = getToken();
//
//   if (token) {
//     config.headers.Authorization = `Token ${token}`;
//   }
//
//   return config;
// });
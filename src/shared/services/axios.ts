import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './localstorage.ts';

export const mainConfig = (): AxiosRequestConfig => ({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // prettier-ignore
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${getToken()}`,
  },
});

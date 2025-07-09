import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './localstorage.ts';

export const mainConfig = (): AxiosRequestConfig => ({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createApiClient = (token?: string) =>
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Token ${token}` }),
    },
    withCredentials: true,
  });

export let apiClient = createApiClient(getToken());

export const setApiClient = (token?: string) => {
  apiClient = createApiClient(token);
};

// export const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   // prettier-ignore
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Token ${getToken()}`,
//   },
// });

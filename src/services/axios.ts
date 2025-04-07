import { AxiosRequestConfig } from 'axios';

export const mainConfig = (): AxiosRequestConfig => ({
  headers: {
    'Content-Type': 'application/json',
  },
});

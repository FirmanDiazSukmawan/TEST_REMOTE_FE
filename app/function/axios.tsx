// components/function/axiosInstance.js

import axios from 'axios';
import {BASE_URL} from '@env';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.data.responseStatus === 403) {
      Promise.resolve();
    }
    return response;
  },
  error => {
    if (error?.response?.status === 404) {
      Promise.resolve();
    }
    if (error?.response?.status === 401) {
      Promise.resolve();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

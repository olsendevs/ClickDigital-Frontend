import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://ec2-18-116-28-156.us-east-2.compute.amazonaws.com:3000',
  //baseURL: 'http://127.0.0.1:3001',
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    const token = localStorage.getItem('AUTH_TOKEN');

    if (token && config.url !== '/auth/sign-in') {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = '/auth/sign-in';
    }
    return Promise.reject(error);
  },
);

const api = {
  axios: axiosInstance,
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
  patch: (url, data = {}, config = {}) =>
    axiosInstance.patch(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default api;

import axios from 'axios';

const instatnce = axios.create({
  baseURL: 'http://localhost:8080',
  // baseURL: 'https://zenweb-production-4f6f.up.railway.app',
});

instatnce.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instatnce;

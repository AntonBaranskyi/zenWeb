import axios from 'axios';

const instatnce = axios.create({
  baseURL: 'http://localhost:8080',
});

instatnce.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instatnce;

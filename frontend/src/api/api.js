
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3001',
    // timeout: 100000,
  });

instance.interceptors.request.use(config => {
  if (localStorage.getItem('jwt')) {
      const accessToken = JSON.parse(localStorage.getItem('jwt')).token;
      config.headers.common = { Authorization: `Bearer ${accessToken}` };
  }
  return config;
}, error => {
  return Promise.reject(error);
});


instance.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.reject(error);
});
export default instance
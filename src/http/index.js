// http.js
import axios from 'axios';

// 创建 axios 实例
const http = axios.create({
  baseURL: '/', // API 的 base_url
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 假设我们通过LocalStorage存储了token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default http;

import axios from 'axios';
import 'moment-timezone';
import qs from 'qs';

const fetchAPI = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    paramsSerializer: (params) => qs.stringify(params, { indices: false, skipNulls: true })
  });

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
      ? `Bearer ${window.localStorage.getItem('token')}`
      : '';
    config.headers.language = window.localStorage.getItem('language')
      ? window.localStorage.getItem('language')
      : process.env.REACT_APP_DEFAULT_LANGUAGE;
    return config;
  });

  return instance;
};

export default fetchAPI();

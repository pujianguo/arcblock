import axios from 'axios';
import globalConfig from '@/config';

const request = axios.create({
  baseURL: globalConfig.apiUrl,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptors
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptors
request.interceptors.response.use(
  ({ data }) => {
    return data;
  },
  (error) => {
    let msg = error.message;
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      } else {
        msg = error.response.data;
      }
    }
    console.log('api response error: ', error);
    return Promise.reject(msg);
  }
);

export const _get = (url, query) => {
  return request.get(url, { params: query });
};
export const _post = (url, body) => {
  return request.post(url, body);
};
export const _patch = (url, body) => {
  return request.patch(url, body);
};
export const _put = (url, body) => {
  return request.put(url, body);
};
export const _delete = (url) => {
  return request.delete(url);
};

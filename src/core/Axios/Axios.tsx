import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
 (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  function(error) {

    if (error.response) {
      switch (error?.response?.status) {
        case 400:
          return Promise.reject(error);
        case 401:
					return Promise.reject(error);
        case 500:
          return Promise.reject(error);
        case 403:
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);


export default instance;
import axios from 'axios';
import { BASE_URL } from "../constants/common";

// We Create axios instance with baseUrl
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {},
});

axiosInstance.interceptors.request.use(
  (config) => {
    const modConfig = config;
    // modConfig.headers['Access-Control-Allow-Origin'] = '*';
    return modConfig;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const modError = error;
    return Promise.reject(modError);
  },
);



export default axiosInstance;

import type { AxiosRequestConfig } from "axios";
import axios from "axios";

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const instance = axios.create(config);

instance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("auth");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);
export default instance;

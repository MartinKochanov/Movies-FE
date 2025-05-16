import type { AxiosRequestConfig } from "axios";
import axios from "axios";

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.API_URL,
};

const instance = axios.create(config);

export default instance;

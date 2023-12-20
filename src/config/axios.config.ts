import axios from "axios";
import { environment } from "../environment/environment";
const API = axios.create({
  baseURL: environment.baseApiURL,
});
export default API;

API.interceptors.request.use(
  async (config: any) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

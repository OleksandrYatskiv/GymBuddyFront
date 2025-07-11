import axios from "axios";
import { redirect } from "react-router-dom";
import { API_URL, APP_ROUTES } from "../constants/constants";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// (Optional) Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Not authorized");
      // logout or redirect here
      redirect(APP_ROUTES.LOGIN);
    }
    return Promise.reject(error);
  }
);

export default api;

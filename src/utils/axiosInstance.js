import axios from "axios";
import { navigation } from "./navigation";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - remove token and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      navigation.navigate("/login", { replace: true });
      return Promise.reject({ ...error, message: "Unauthorized. Please login again." });
    }
    
    const message =
      error.response?.data?.ResponseMessage || "Something went wrong!";
    return Promise.reject({ ...error, message });
  }
);

export default axiosInstance;

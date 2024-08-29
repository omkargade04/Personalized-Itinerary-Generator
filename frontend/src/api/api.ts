import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("profile");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://bellavogue.ddns.net";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    const isAuthFree =
      config.url.includes("login") ||
      config.url.includes("register");

    if (!isAuthFree) {
      const token = localStorage.getItem("access");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthFree =
      originalRequest.url.includes("login") ||
      originalRequest.url.includes("register");

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isAuthFree
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${BASE_URL}/api/token/refresh/`,
            { refresh: refreshToken }
          );

          const newAccess = res.data.access;
          localStorage.setItem("access", newAccess);

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return API(originalRequest);
        } catch (err) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("authUser");

          window.dispatchEvent(new CustomEvent("userLogout"));
        }
      }
    }

    return Promise.reject(error);
  }
);

export default API;

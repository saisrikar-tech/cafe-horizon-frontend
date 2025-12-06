// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/products",
});

// --------------------- REQUEST INTERCEPTOR ---------------------
api.interceptors.request.use(
  (config) => {
    // Allow LOGIN & REGISTER requests without token
    if (
      config.url.includes("/login") ||
      config.url.includes("/register")
    ) {
      return config; // Skip token check
    }

    const token = localStorage.getItem("token");

    // If no token found → block request (but don't reload)
    if (!token) {
      return Promise.reject(new Error("No token found"));
    }

    // Attach token to all protected requests
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --------------------- RESPONSE INTERCEPTOR ---------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout on expired token
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login only AFTER response failure
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;

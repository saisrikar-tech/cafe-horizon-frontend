// api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  
 // baseURL: "http://localhost:3000/api/v1/products",
});
console.log("Backend URL:",  import.meta.env.VITE_BACKEND_URL);

// add interceptors to handle token and auto logout on 401 errors
  api.interceptors.request.use(
     (config) => {  
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


export default api;

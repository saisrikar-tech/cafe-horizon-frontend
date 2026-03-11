// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://cafe-horizon-server.vercel.app/api/v1/products",
 // baseURL: "http://localhost:3000/api/v1/products",
});

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

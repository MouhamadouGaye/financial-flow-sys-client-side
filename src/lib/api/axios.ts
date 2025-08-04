// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/banking-api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if using cookies
});

// Automatically attach token if stored
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

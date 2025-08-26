import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // 10s timeout
  withCredentials: true, // CSRF protection with cookies
});

// Request interceptor for tokens
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor for errors & refresh
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await client.post("/auth/refresh");
        const newToken = refreshResponse.data.accessToken;
        localStorage.setItem("access_token", newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return client.request(error.config); // retry original request
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        window.location.href = "/login"; // force re-auth
      }
    }
    return Promise.reject(error);
  }
);

export default client;

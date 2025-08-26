import { ref } from "vue";
import client from "@/api/httpClient";

const accessToken = ref<string | null>(localStorage.getItem("access_token"));

export function useAuth() {
  async function login(email: string, password: string) {
    const { data } = await client.post("/auth/login", { email, password });
    accessToken.value = data.accessToken;
    localStorage.setItem("access_token", data.accessToken);
  }

  async function logout() {
    accessToken.value = null;
    localStorage.removeItem("access_token");
    await client.post("/auth/logout");
  }

  async function refreshToken() {
    const { data } = await client.post("/auth/refresh");
    accessToken.value = data.accessToken;
    localStorage.setItem("access_token", data.accessToken);
  }

  return { accessToken, login, logout, refreshToken };
}

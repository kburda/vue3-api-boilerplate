import { defineStore } from "pinia";
import { useAuth } from "@/composables/useAuth";

export const useAuthStore = defineStore("auth", () => {
  const { accessToken, login, logout, refreshToken } = useAuth();
  return { accessToken, login, logout, refreshToken };
});

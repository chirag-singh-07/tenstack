import { create } from "zustand";
import axios from "axios";
import { LoginAuthData, RegisterAuthData } from "@/types";
import { toast } from "sonner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // Enable sending cookies with requests

type AuthState = {
  loading: boolean;
  error: string | null;
  success: boolean;
  user: any; // Replace `any` with your actual user type if needed
  loginUser: (
    formData: { email: string; password: string },
    navigate: (path: string) => void
  ) => Promise<void>;
  registerUser: (
    formData: { name: string; email: string; password: string },
    navigate: (path: string) => void
  ) => Promise<void>;
  resetState: () => void;
  logoutUser: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  success: false,
  user: null,

  checkAuth: async () => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axios.get("/api/auth/me");
      set({ user: response.data, success: true });
      // console.log("user",response?.data)
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Authentication failed" });
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async (
    formData: LoginAuthData,
    navigate: (path: string) => void
  ) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axios.post("/api/auth/login", formData);
      set({ user: response.data, success: true });
      toast("Welcome back!");
      navigate("/");
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Login failed" });
      toast(err?.response?.data?.message || "Login failed");
    } finally {
      set({ loading: false });
    }
  },

  registerUser: async (
    formData: RegisterAuthData,
    navigate: (path: string) => void
  ) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axios.post("/api/auth/register", formData);
      set({ user: response.data, success: true });
      toast("Welcome! ");
      navigate("/");
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Registration failed" });
      console.log("error", err);
      toast(err?.response?.data?.message || "Registration failed");
    } finally {
      set({ loading: false });
    }
  },

  // Add a logout function if needed
  logoutUser: async () => {
    set({ loading: true, error: null, success: false });
    try {
      await axios.post("/api/auth/logout");
      set({ user: null, success: true });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || "Logout failed" });
    } finally {
      set({ loading: false });
    }
  },

  resetState: () => set({ loading: false, error: null, success: false }),
}));

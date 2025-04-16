import { create } from "zustand";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // Enable sending cookies with requests


export const useAuthStore = create((set) => ({
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
    } catch (err) {
      set({ error: err?.response?.data?.message || "Authentication failed" });
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async (
    formData,
    navigate
  ) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axios.post("/api/auth/login", formData);
      set({ user: response.data, success: true });
      navigate("/");
    } catch (err) {
      set({ error: err?.response?.data?.message || "Login failed" });
    } finally {
      set({ loading: false });
    }
  },

  registerUser: async (
    formData,
    navigate
  ) => {
    set({ loading: true, error: null, success: false });
    try {
      const response = await axios.post("/api/auth/register", formData);
      set({ user: response.data, success: true });
      navigate("/");
    } catch (err) {
      set({ error: err?.response?.data?.message || "Registration failed" });
      console.log("error", err);
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
    } catch (err) {
      set({ error: err?.response?.data?.message || "Logout failed" });
    } finally {
      set({ loading: false });
    }
  },

  resetState: () => set({ loading: false, error: null, success: false }),
}));

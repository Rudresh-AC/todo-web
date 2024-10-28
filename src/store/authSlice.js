import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const saveAuthStatus = (status) => async () => {
  try {
    await localforage.setItem("isAuthenticated", status);
  } catch (error) {
    console.error("Failed to save auth status:", error);
  }
};

export const loadAuthStatus = () => async (dispatch) => {
  try {
    const storedStatus = await localforage.getItem("isAuthenticated");
    if (storedStatus) {
      dispatch(login());
    }
  } catch (error) {
    console.error("Failed to load auth status:", error);
  }
};

export const clearAuthStatus = () => async () => {
  try {
    await localforage.removeItem("isAuthenticated");
  } catch (error) {
    console.error("Failed to clear auth status:", error);
  }
};

export default authSlice.reducer;

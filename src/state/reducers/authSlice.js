import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated:
    localStorage.getItem("isAuthenticated") == false
      ? JSON.parse(localStorage.getItem("isAuthenticated"))
      : false,
  token:
    localStorage.getItem("token") == null
      ? JSON.parse(localStorage.getItem("token"))
      : null,
  userData:
    localStorage.getItem("userData") == null
      ? JSON.parse(localStorage.getItem("userData"))
      : null,
  registerData:
    localStorage.getItem("registerData") == null
      ? JSON.parse(localStorage.getItem("registerData"))
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userData", action.payload.user);
    },
    register: (state, action) => {
      state.registerData = action.payload;
      localStorage.setItem("registerData", action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userData");
    },
  },
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;

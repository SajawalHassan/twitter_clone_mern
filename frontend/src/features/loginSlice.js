import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  error: "",
};

const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = payload;
    },
    logout: (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = "";
    },
    clearError: (state) => {
      state.error = false;
    },
  },
});

const { actions, reducer } = loginSlice;

export const { loginFail, loginPending, loginSuccess, logout, clearError } =
  actions;

export default reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loginIsOpen: false,
  isAuth: false,
  error: "",
};

const loginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    setloginPending: (state, { payload }) => {
      state.isLoading = payload;
    },
    setLoginModalState: (state, { payload }) => {
      state.isLoading = false;
      state.loginIsOpen = payload;
      state.isAuth = false;
      state.error = "";
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.loginIsOpen = false;
      state.isAuth = true;
      state.error = "";
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = payload;
    },
    loginErrorClear: (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = "";
    },
  },
});

const { actions, reducer } = loginSlice;

export const {
  loginErrorClear,
  loginFail,
  loginSuccess,
  setLoginModalState,
  setloginPending,
} = actions;

export default reducer;

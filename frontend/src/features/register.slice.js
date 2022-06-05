import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  registerIsOpen: false,
  error: "",
};

const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    setRegisterPending: (state, { payload }) => {
      state.isLoading = payload;
    },
    registerSuccess: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    registerFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    setRegisterModalState: (state, { payload }) => {
      state.isLoading = false;
      state.registerIsOpen = payload;
      state.error = "";
    },
    registerErrorClear: (state) => {
      state.error = "";
    },
  },
});

const { actions, reducer } = registerSlice;

export const {
  registerFail,
  setRegisterPending,
  registerSuccess,
  registerErrorClear,
  setRegisterModalState,
} = actions;

export default reducer;

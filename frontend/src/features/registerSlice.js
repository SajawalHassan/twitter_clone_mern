import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
};

const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    registerPending: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    registerFail: (state, { payload }) => {
      state.isLoading = true;
      state.error = payload;
    },
  },
});

const { actions, reducer } = registerSlice;

export const { registerFail, registerPending, registerSuccess } = actions;

export default reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  verificationIsOpen: false,
  code: "",
  displayname: "",
  username: "",
  email: "",
  password: "",
  month: "",
  day: "",
  year: "",
  error: "",
};

const verificationSlice = createSlice({
  name: "Verification",
  initialState,
  reducers: {
    setVerificationPending: (state, { payload }) => {
      state.isLoading = payload;
    },
    setVerificationModalState: (state, { payload }) => {
      state.isLoading = false;
      state.verificationIsOpen = payload.verificationIsOpen;
      state.code = payload.code;
      state.email = payload.email;
      state.displayname = payload.displayname;
      state.username = payload.username;
      state.email = payload.email;
      state.password = payload.password;
      state.month = payload.month;
      state.day = payload.day;
      state.year = payload.year;
    },
    verificationFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    verificationErrorClear: (state) => {
      state.error = "";
    },
  },
});

const { actions, reducer } = verificationSlice;

export const {
  setVerificationModalState,
  verificationFail,
  setVerificationPending,
  verificationErrorClear,
} = actions;

export default reducer;

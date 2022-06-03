import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  accessToVerificationPage: false,
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
    setAccessToVerificationPage: (state, { payload }) => {
      state.isLoading = false;
      state.accessToVerificationPage = payload.access;
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
  setAccessToVerificationPage,
  verificationFail,
  setVerificationPending,
  verificationErrorClear,
} = actions;

export default reducer;

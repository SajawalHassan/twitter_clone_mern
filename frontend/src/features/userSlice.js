import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: {},
  error: "",
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      state.error = "";
    },
    getUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.user = {};
      state.error = payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { getUserFail, getUserPending, getUserSuccess } = actions;

export default reducer;

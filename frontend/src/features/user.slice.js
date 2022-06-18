import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  allUsers: [],
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setAllUsers: (state, { payload }) => {
      state.allUsers = payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { setUser, setAllUsers } = actions;

export default reducer;

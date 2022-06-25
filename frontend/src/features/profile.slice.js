import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userIsFollowed: false,
};

const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setUserIsFollowed: (state, { payload }) => {
      state.userIsFollowed = payload;
    },
  },
});

const { actions, reducer } = profileSlice;

export const { setUserIsFollowed } = actions;

export default reducer;

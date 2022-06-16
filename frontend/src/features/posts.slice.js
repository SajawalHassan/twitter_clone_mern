import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  posts: [],
  owner: {},
};

const postsSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    setPostsPending: (state, { payload }) => {
      state.isLoading = payload;
    },
    postsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = payload;
    },
  },
});

const { actions, reducer } = postsSlice;

export const { postsSuccess, setPostsPending } = actions;

export default reducer;

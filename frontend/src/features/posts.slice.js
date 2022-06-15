import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
  },
});

const { actions, reducer } = postsSlice;

export const { setPosts } = actions;

export default reducer;

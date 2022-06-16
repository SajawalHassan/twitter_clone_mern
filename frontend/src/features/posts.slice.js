import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  posts: [],
  ownerInfo: {},
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
      state.posts = payload.posts;
      state.ownerInfo = payload.ownerInfo;
    },
  },
});

const { actions, reducer } = postsSlice;

export const { postsSuccess, setPostsPending } = actions;

export default reducer;

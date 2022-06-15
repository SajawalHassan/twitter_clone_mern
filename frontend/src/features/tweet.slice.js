import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  tweetModalIsOpen: false,
  error: "",
};

const tweetSlice = createSlice({
  name: "Tweet",
  initialState,
  reducers: {
    setTweetPending: (state, { payload }) => {
      state.isLoading = payload;
    },
    setTweetModal: (state, { payload }) => {
      state.tweetModalIsOpen = payload;
    },
    tweetSuccess: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    tweetFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    tweetErrorClear: (state) => {
      state.isLoading = false;
      state.error = "";
    },
  },
});

const { actions, reducer } = tweetSlice;

export const {
  setTweetModal,
  setTweetPending,
  tweetFail,
  tweetSuccess,
  tweetErrorClear,
} = actions;

export default reducer;

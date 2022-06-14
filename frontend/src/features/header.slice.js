import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerMenuIsOpen: false,
};

const headerSlice = createSlice({
  name: "Header",
  initialState,
  reducers: {
    setHeaderMenuOpen: (state, { payload }) => {
      state.headerMenuIsOpen = payload;
    },
  },
});

const { actions, reducer } = headerSlice;

export const { setHeaderMenuOpen } = actions;

export default reducer;

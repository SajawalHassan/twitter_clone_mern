const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  sidebarProfileMenuIsOpen: false,
};

const sidebarSlice = createSlice({
  name: "Sidebar",
  initialState,
  reducers: {
    setSidebarProfileMenuIsOpen: (state, { payload }) => {
      state.sidebarProfileMenuIsOpen = payload;
    },
  },
});

const { actions, reducer } = sidebarSlice;

export const { setSidebarProfileMenuIsOpen } = actions;

export default reducer;

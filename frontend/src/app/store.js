import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/registerSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});

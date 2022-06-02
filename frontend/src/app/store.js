import { configureStore } from "@reduxjs/toolkit";

import registerReducer from "../features/register.slice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});

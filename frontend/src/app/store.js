import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/es/storage/session";
import thunk from "redux-thunk";

import registerReducer from "../features/register.slice";
import verificationReducer from "../features/verification.slice";

// Combining reducers
const reducers = combineReducers({
  register: registerReducer,
  verification: verificationReducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["verification"], // Slicers that will be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Creating store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

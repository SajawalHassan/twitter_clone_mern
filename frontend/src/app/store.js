import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import registerReducer from "../features/register.slice";
import verificationReducer from "../features/verification.slice";
import loginReducer from "../features/login.slice";
import userReducer from "../features/user.slice";
import sidebarReducer from "../features/sidebar.slice";
import tweetReducer from "../features/tweet.slice";
import headerReducer from "../features/header.slice";
import postsReducer from "../features/posts.slice";
import storage from "redux-persist/lib/storage";

// Combining reducers
const reducers = combineReducers({
  register: registerReducer,
  verification: verificationReducer,
  login: loginReducer,
  user: userReducer,
  sidebar: sidebarReducer,
  tweet: tweetReducer,
  header: headerReducer,
  posts: postsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["verification", "user", "login"], // Slicers that will be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Creating store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

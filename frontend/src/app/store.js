import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import registerReducer from "../features/register.slice";
import verificationReducer from "../features/verification.slice";
import loginReducer from "../features/login.slice";
import userReducer from "../features/user.slice";
import tweetReducer from "../features/tweet.slice";
import postsReducer from "../features/posts.slice";
import profileReducer from "../features/profile.slice";
import storage from "redux-persist/lib/storage";

// Combining reducers
const reducers = combineReducers({
  register: registerReducer,
  verification: verificationReducer,
  login: loginReducer,
  user: userReducer,
  tweet: tweetReducer,
  posts: postsReducer,
  profile: profileReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "login", "profile"], // Slicers that will be persisted
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Creating store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./service/auth/authApi";
import { eventApi } from "./service/event/eventApi";
import { blogApi } from "./service/blog/blogApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(eventApi.middleware)
      .concat(blogApi.middleware),
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

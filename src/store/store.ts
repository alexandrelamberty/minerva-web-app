import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./reducers/course.reducer.ts";
import authReducer from "./reducers/auth.reducer.js";
import trainingReducer from "./reducers/training.reducer.js";
import userReducer from "./reducers/user.reducer.js";
import notificationReducer from "./reducers/notification.reducer.js";
import trainingCategoryReducer from "./reducers/training-category.reducer.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trainings: trainingReducer,
    categories: trainingCategoryReducer,
    courses: courseReducer,
    users: userReducer,
    notification: notificationReducer,
  },
  devTools: import.meta.env.DEV,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import aiReducer from "./reducers/ai.reducer";
import authReducer from "./reducers/auth.reducer";
import courseReducer from "./reducers/course.reducer";
import enrollmentReducer from "./reducers/enrollment.reducer";
import modalReducer from "./reducers/modals.reducer";
import notificationReducer from "./reducers/notification.reducer";
import studentReducer from "./reducers/student.reducer";
import teacherReducer from "./reducers/teacher.reducer";
import trainingCategoryReducer from "./reducers/training-category.reducer";
import trainingReducer from "./reducers/training.reducer";
import userReducer from "./reducers/user.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trainings: trainingReducer,
    categories: trainingCategoryReducer,
    courses: courseReducer,
    teachers: teacherReducer,
    students: studentReducer,
    users: userReducer,
    enrollments: enrollmentReducer,
    ai: aiReducer,
    notification: notificationReducer,
    modals: modalReducer,
  },
  devTools: import.meta.env.DEV,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

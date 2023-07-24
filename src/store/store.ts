import {
  PreloadedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
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
// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
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
  // ws: webSocketRuducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // TODO: Why error now ?
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

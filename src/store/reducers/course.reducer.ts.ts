import { createReducer } from "@reduxjs/toolkit";
courseCreateAction;
import {
  courseGetAllAction,
  courseCreateAction,
  courseReadAction,
  courseUpdateAction,
  courseDeleteAction,
} from "../actions/course.actions";

import COURSES from "../mock-data/courses.json";

export type CoursesState = {
  courses: any[];
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: CoursesState = {
  courses: COURSES,
  count: 0,
  loading: "idle",
  errors: null,
};

const courseReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(courseGetAllAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(courseGetAllAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(courseGetAllAction.fulfilled, (state, { payload }) => {
      console.log("REDUCER", payload);
      state.courses = state.courses.concat(payload);
      state.count = state.courses.length;
      state.loading = "idle";
    })
    .addCase(courseCreateAction, (state, action) => {
      const course = action.payload;
      state.courses.push(course);
      state.count = state.courses.length;
    })
    .addCase(courseReadAction, (state, action) => {
      const course = action.payload;
      state.courses.push(course);
      state.count = state.courses.length;
    })
    .addCase(courseDeleteAction, (state, action) => {
      const courseId = action.payload;
      state.courses = state.courses.filter((course) => course.id !== courseId);
      state.count = state.courses.length;
    });
});

export default courseReducer;

import { createReducer } from "@reduxjs/toolkit";
import {
  createCourseAction,
  deleteCourseAction,
  getAllCoursesAction,
  readCourseAction,
  updateCourseAction,
} from "../actions/course.actions";

import { Course } from "../../models/course.model";

export type CoursesState = {
  courses: Course[];
  courseDetails: Course | null;
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: CoursesState = {
  courses: [],
  courseDetails: null,
  count: 0,
  loading: "idle",
  errors: null,
};

const courseReducer = createReducer(initialState, (builder) => {
  builder
    // Get All
    .addCase(getAllCoursesAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(getAllCoursesAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(getAllCoursesAction.fulfilled, (state, { payload }) => {
      console.log("REDUCER", payload);
      state.courses = state.courses.concat(payload);
      state.count = state.courses.length;
      state.loading = "idle";
    })
    // Create
    .addCase(createCourseAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(createCourseAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(createCourseAction.fulfilled, (state, { payload }) => {
      state.courses = state.courses.concat(payload);
      state.count = state.courses.length;
      state.loading = "idle";
    })
    // Read
    .addCase(readCourseAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(readCourseAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(readCourseAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.courseDetails = payload;
    })
    // Update
    .addCase(updateCourseAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(updateCourseAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(updateCourseAction.fulfilled, (state, { payload }) => {
      console.log("REDUCER", payload);
      state.loading = "idle";
      // Replace
    })
    // Delete
    .addCase(deleteCourseAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(deleteCourseAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(deleteCourseAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      // Remove
    });
});

export default courseReducer;

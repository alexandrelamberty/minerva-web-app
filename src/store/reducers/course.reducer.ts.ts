import { createReducer } from "@reduxjs/toolkit";
import {
  createCourseAction,
  deleteCourseAction,
  getAllCoursesAction,
  readCourseAction,
  showCourseCreateModalAction,
  updateCourseAction,
} from "../actions/course.actions";

import { Course } from "../../models/course.model";

export type CoursesState = {
  courses: Course[];
  course: Course | null;
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
  showCreateModal: boolean;
};

const initialState: CoursesState = {
  courses: [],
  course: null,
  count: 0,
  loading: "idle",
  errors: null,
  showCreateModal: false,
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
      state.courses = payload.results;
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
      state.loading = "idle";
      state.courses.push(payload);
      state.count = state.courses.length;
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
      state.course = payload.result;
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
      // TODO: Update
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
      state.courses = state.courses.filter(function (item) {
        return item.id != payload;
      });
    })

    // UI
    .addCase(showCourseCreateModalAction, (state, { payload }) => {
      state.showCreateModal = payload;
    });
});

export default courseReducer;

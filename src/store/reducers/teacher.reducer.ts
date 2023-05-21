import { createReducer } from "@reduxjs/toolkit";
import { Teacher } from "../../models/teacher.model";
import { getAllTeachersAction } from "../actions/teacher.actions";

export type TeacherState = {
  teachers: Teacher[];
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: TeacherState = {
  teachers: [],
  count: 0,
  loading: "idle",
  errors: null,
};

const teacherReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllTeachersAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(getAllTeachersAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(getAllTeachersAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.teachers = payload.results;
      state.count = state.teachers.length;
    });
});

export default teacherReducer;

import { createReducer } from "@reduxjs/toolkit";
import { Teacher } from "../../models/teacher.model";
import {
  getAllTeachersAction,
  getTeacherByIdAction,
} from "../actions/teacher.actions";
import { getTeacherById } from "../../services/api-service";

export type TeacherState = {
  teachers: Teacher[];
  teacher: Teacher | null;
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: TeacherState = {
  teachers: [],
  teacher: null,
  count: 0,
  loading: "idle",
  errors: null,
};

const teacherReducer = createReducer(initialState, (builder) => {
  builder
    // Get All Teachers
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
    })
    // Get Teacher By Id
    .addCase(getTeacherByIdAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(getTeacherByIdAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(getTeacherByIdAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.teacher = payload.result;
    });
});

export default teacherReducer;

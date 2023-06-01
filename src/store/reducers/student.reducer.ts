import { createReducer } from "@reduxjs/toolkit";
import { Student } from "../../models/student.model";
import {
  getAllStudentsAction,
  getStudentByIdAction,
} from "../actions/students.actions";

export type StudentState = {
  students: Student[];
  student: Student | null;
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: StudentState = {
  students: [],
  student: null,
  count: 0,
  loading: "idle",
  errors: null,
};

const studentReducer = createReducer(initialState, (builder) => {
  builder
    // Get ALl Students
    .addCase(getAllStudentsAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(getAllStudentsAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(getAllStudentsAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.students = payload.results;
      state.count = state.students.length;
    })
    // Get Student By Id
    .addCase(getStudentByIdAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(getStudentByIdAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(getStudentByIdAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.student = payload.result;
    });
});

export default studentReducer;

import { createReducer } from "@reduxjs/toolkit";
import { Student } from "../../models/student.model";
import { getAllStudentsAction } from "../actions/students.actions";

export type StudentState = {
  students: Student[];
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: StudentState = {
  students: [],
  count: 0,
  loading: "idle",
  errors: null,
};

const studentReducer = createReducer(initialState, (builder) => {
  builder
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
    });
});

export default studentReducer;

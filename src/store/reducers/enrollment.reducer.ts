import { createReducer } from "@reduxjs/toolkit";
import { Enrollment } from "../../models/enrollment.model";
import { TrainingCategory } from "../../models/training-category.model";
import {
  createTrainingAction,
  deleteTrainingAction,
  getAllTrainingsAction,
  readTrainingAction,
  showTrainingCreateModalAction,
} from "../actions/training.actions";
import {
  createEnrollmentAction,
  deleteEnrollmentAction,
  getAllEnrollmentsAction,
  readEnrollmentAction,
} from "../actions/enrollment.actions";
import { readEnrollment } from "../../services/api-service";

export type EnrollmentState = {
  enrollments: Enrollment[];
  enrollment: Enrollment | null;
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
  showModal: boolean;
  successCreate: boolean;
  successUpdate: boolean;
  successDelete: boolean;
};

const initialState: EnrollmentState = {
  enrollments: [],
  enrollment: null,
  count: 0,
  loading: "idle",
  errors: null,
  showModal: false,
  successCreate: false,
  successUpdate: false,
  successDelete: false,
};

const enrollmentReducer = createReducer(initialState, (builder) => {
  builder
    // Get All
    .addCase(getAllEnrollmentsAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(getAllEnrollmentsAction.rejected, (state, action) => {
      state.loading = "failed";
      state.errors = action.payload as string;
    })
    .addCase(getAllEnrollmentsAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.enrollments = payload.results;
      state.count = state.enrollments.length;
    })
    // Create
    .addCase(createEnrollmentAction.pending, (state, action) => {
      state.loading = "pending";
      state.successCreate = false;
    })
    .addCase(createEnrollmentAction.rejected, (state, { payload }) => {
      state.loading = "failed";
      state.successCreate = false;
      state.errors = payload as string;
    })
    .addCase(createEnrollmentAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.successCreate = true;
      state.enrollments.push(payload.results);
      console.log(payload);
      state.showModal = false;
    })
    // Read
    .addCase(readEnrollmentAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(readEnrollmentAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(readEnrollmentAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      // We assign the result category training
      state.enrollment = payload.result;
      state.showModal = false;
    })
    // TODO: Update
    // Delete
    .addCase(deleteEnrollmentAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(deleteEnrollmentAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(deleteEnrollmentAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      // We remove the deleted training category
      state.enrollments = state.enrollments.filter(function (item) {
        return item.id != payload;
      });
    })
    // UI
    .addCase(showTrainingCreateModalAction, (state, { payload }) => {
      state.showModal = payload;
    });
});

export default enrollmentReducer;

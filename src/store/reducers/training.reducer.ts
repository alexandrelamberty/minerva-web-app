import { createReducer } from "@reduxjs/toolkit";
import { getAllTrainingsAction } from "../actions/training.actions";
import { TrainingCategory } from "../../models/training-category.model";
import { Training } from "../../models/training.model";

export type TrainingState = {
  categories: TrainingCategory[];
  trainings: Training[];
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
  showModal: boolean;
  successCreate: boolean;
  successUpdate: boolean;
  successDelete: boolean;
};

const initialState: TrainingState = {
  categories: [],
  trainings: [],
  count: 0,
  loading: "idle",
  errors: null,
  showModal: true,
  successCreate: false,
  successUpdate: false,
  successDelete: false,
};

const trainingReducer = createReducer(initialState, (builder) => {
  builder
    // Get All
    .addCase(getAllTrainingsAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(getAllTrainingsAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(getAllTrainingsAction.fulfilled, (state, { payload }) => {
      state.trainings = state.trainings.concat(payload);
      state.count = state.trainings.length;
      state.loading = "idle";
    });
  // Create
  // Read
  // Update
  // Delete
});

export default trainingReducer;

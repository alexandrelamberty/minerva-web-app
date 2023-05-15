import { createReducer } from "@reduxjs/toolkit";
import {
  createTrainingAction,
  deleteTrainingAction,
  getAllTrainingsAction,
  showTrainingCreateModalAction,
} from "../actions/training.actions";
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
      state.errors = action.payload as string;
    })
    .addCase(getAllTrainingsAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.trainings = payload.results;
      state.count = state.trainings.length;
    })
    // Create
    .addCase(createTrainingAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(createTrainingAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(createTrainingAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.trainings.push(payload.result);
      state.showModal = false;
    })
    // TODO: Read
    // TODO: Update
    // Delete
    .addCase(deleteTrainingAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(deleteTrainingAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(deleteTrainingAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      // We remove the deleted training category
      state.trainings = state.trainings.filter(function (item) {
        return item.id != payload;
      });
    })
    // UI
    .addCase(showTrainingCreateModalAction, (state, { payload }) => {
      state.showModal = payload;
    });
});

export default trainingReducer;

import { createReducer } from "@reduxjs/toolkit";
import { TrainingCategory } from "../../models/training-category.model";
import { Training } from "../../models/training.model";
import {
  createTrainingAction,
  deleteTrainingAction,
  getAllTrainingsAction,
  readTrainingAction,
  showTrainingCreateModalAction,
} from "../actions/training.actions";

export type TrainingState = {
  categories: TrainingCategory[];
  trainings: Training[];
  training: Training | null;
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
  training: null,
  count: 0,
  loading: "idle",
  errors: null,
  showModal: false,
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
      state.count = payload.count;
    })
    // Create
    .addCase(createTrainingAction.pending, (state, action) => {
      state.loading = "pending";
      state.successCreate = false;
    })
    .addCase(createTrainingAction.rejected, (state, { payload }) => {
      state.loading = "failed";
      state.successCreate = false;
      state.errors = payload as string;
    })
    .addCase(createTrainingAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.successCreate = true;
      state.trainings.push(payload.result);
      state.showModal = false;
    })
    // Read
    .addCase(readTrainingAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(readTrainingAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(readTrainingAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      // We assign the result category training
      state.training = payload.result;
      state.showModal = false;
    })
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

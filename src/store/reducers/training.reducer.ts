import { createReducer } from "@reduxjs/toolkit";
import {
  trainingsDeleteAction,
  trainingsInsertAction,
  trainingsFetchAction,
} from "../actions/training.actions";

import TRAININGS from "../mock-data/trainings.json";
import CATEGORIES from "../mock-data/trainings-categories.json";
import { Training } from "../../models/training.model";
import { TrainingCategory } from "../../models/training-category.model";

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
  categories: CATEGORIES,
  trainings: TRAININGS,
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
    .addCase(trainingsFetchAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(trainingsFetchAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(trainingsFetchAction.fulfilled, (state, { payload }) => {
      state.trainings = state.trainings.concat(payload);
      state.count = state.trainings.length;
      state.loading = "idle";
    })
    .addCase(trainingsInsertAction, (state, action) => {
      const training = action.payload;
      state.trainings.push(training);
      state.count = state.trainings.length;
    })
    .addCase(trainingsDeleteAction, (state, action) => {
      const trainingId = action.payload;
      state.trainings = state.trainings.filter(
        (product) => product.id !== trainingId
      );
      state.count = state.trainings.length;
    });
});

export default trainingReducer;

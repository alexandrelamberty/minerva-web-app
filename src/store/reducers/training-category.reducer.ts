import { createReducer } from "@reduxjs/toolkit";
import { TrainingCategory } from "../../models/training-category.model";
import {
  createTrainingCategoryAction,
  deleteTrainingCategoryAction,
  getAllTrainingsCategoriesAction,
  showTrainingCategoryCreateModalAction,
} from "../actions/training-category.actions";

export type TrainingCategoryState = {
  categories: TrainingCategory[];
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
  showModal: boolean;
  successCreate: boolean;
  successUpdate: boolean;
  successDelete: boolean;
};

const initialState: TrainingCategoryState = {
  categories: [],
  count: 0,
  loading: "idle",
  errors: null,
  showModal: false,
  successCreate: false,
  successUpdate: false,
  successDelete: false,
};

const trainingCategoryReducer = createReducer(initialState, (builder) => {
  builder
    // Get All
    .addCase(getAllTrainingsCategoriesAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(getAllTrainingsCategoriesAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(
      getAllTrainingsCategoriesAction.fulfilled,
      (state, { payload }) => {
        state.loading = "idle";
        state.categories = payload.results;
      }
    )
    // Create
    .addCase(createTrainingCategoryAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(createTrainingCategoryAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(createTrainingCategoryAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      // We push the created training category
      state.categories.push(payload.result);
      state.showModal = false;
    })
    // TODO: Read
    // TODO: Update
    // Delete
    .addCase(deleteTrainingCategoryAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(deleteTrainingCategoryAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(deleteTrainingCategoryAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      // We remove the deleted training category
      state.categories = state.categories.filter(function (item) {
        return item.id != payload;
      });
    })
    // UI
    .addCase(showTrainingCategoryCreateModalAction, (state, { payload }) => {
      state.showModal = payload;
    });
});

export default trainingCategoryReducer;

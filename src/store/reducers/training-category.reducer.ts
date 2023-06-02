import { createReducer } from "@reduxjs/toolkit";
import { TrainingCategory } from "../../models/training-category.model";
import {
  createTrainingCategoryAction,
  deleteTrainingCategoryAction,
  getAllTrainingsCategoriesAction,
  readTrainingCategoryAction,
  showTrainingCategoryCreateModalAction,
} from "../actions/training-category.actions";

export type TrainingCategoryState = {
  categories: TrainingCategory[];
  category: TrainingCategory | null;
  count: number;
  loadingCreate: "idle" | "pending" | "succeeded" | "failed";
  errorsCreate: string | null;
  showModal: boolean;
  successCreate: boolean;
  successUpdate: boolean;
  successDelete: boolean;
};

const initialState: TrainingCategoryState = {
  categories: [],
  category: null,
  count: 0,
  loadingCreate: "idle",
  errorsCreate: null,
  showModal: false,
  successCreate: false,
  successUpdate: false,
  successDelete: false,
};

const trainingCategoryReducer = createReducer(initialState, (builder) => {
  builder
    // Get All
    .addCase(getAllTrainingsCategoriesAction.pending, (state, action) => {
      state.loadingCreate = "pending";
    })
    .addCase(getAllTrainingsCategoriesAction.rejected, (state, action) => {
      state.loadingCreate = "failed";
    })
    .addCase(
      getAllTrainingsCategoriesAction.fulfilled,
      (state, { payload }) => {
        state.loadingCreate = "idle";
        state.categories = payload.results;
      }
    )
    // Create
    .addCase(createTrainingCategoryAction.pending, (state, action) => {
      state.loadingCreate = "pending";
      state.successCreate = false;
    })
    .addCase(createTrainingCategoryAction.rejected, (state, { payload }) => {
      state.loadingCreate = "failed";
      state.successCreate = false;
      state.errorsCreate = payload as string;
    })
    .addCase(createTrainingCategoryAction.fulfilled, (state, { payload }) => {
      state.loadingCreate = "idle";
      state.successCreate = true;
      // We push the created training category
      state.categories.push(payload.result);
      state.showModal = false;
    })
    // Read
    .addCase(readTrainingCategoryAction.pending, (state, action) => {
      state.loadingCreate = "pending";
      state.category = null;
    })
    .addCase(readTrainingCategoryAction.rejected, (state, action) => {
      state.successCreate = false;
      state.loadingCreate = "failed";
    })
    .addCase(readTrainingCategoryAction.fulfilled, (state, { payload }) => {
      state.loadingCreate = "idle";
      state.category = payload.result;
      state.showModal = false;
    })
    // TODO: Update
    // ...
    // Delete
    .addCase(deleteTrainingCategoryAction.pending, (state, action) => {
      state.loadingCreate = "pending";
      state.successDelete = false;
    })
    .addCase(deleteTrainingCategoryAction.rejected, (state, action) => {
      state.loadingCreate = "failed";
      state.successDelete = false;
    })
    .addCase(deleteTrainingCategoryAction.fulfilled, (state, { payload }) => {
      state.loadingCreate = "idle";
      state.successDelete = true;
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

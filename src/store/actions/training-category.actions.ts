import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import {
  CreateTrainingCategory,
  UpdateTrainingCategory,
} from "../../models/training-category.model";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  readCategory,
  updateCategory,
} from "../../services/api-service";

export const getAllTrainingsCategoriesAction = createAsyncThunk(
  "categories/fetch",
  async () => {
    try {
      const response = await getAllCategories();
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainings Category Error: " + err);
    }
  }
);

export const createTrainingCategoryAction = createAsyncThunk(
  "categories/create",
  async (data: CreateTrainingCategory) => {
    try {
      const response = await createCategory(data);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainings Catego Error: " + err);
    }
  }
);

export const readTrainingCategoryAction = createAsyncThunk(
  "categories/read",
  async (id: string) => {
    try {
      const response = await readCategory(id);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainingsry Category Error: " + err);
    }
  }
);

export const updateTrainingCategoryAction = createAsyncThunk(
  "categories/update",
  async (data: UpdateTrainingCategory) => {
    try {
      const response = await updateCategory(data);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainings Error: " + err);
    }
  }
);

export const deleteTrainingCategoryAction = createAsyncThunk(
  "categories/delete",
  async (id: string) => {
    try {
      const response = await deleteCategory(id);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainings Error: " + err);
    }
  }
);

import {
  createAction,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
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
  updateCategoryCover,
} from "../../services/api-service";
import { AxiosError } from "axios";
import { notificationShowAction } from "./notification.actions";

export const getAllTrainingsCategoriesAction = createAsyncThunk(
  "categories/fetch",
  async (data: any, thunkAPI) => {
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
  async (data: CreateTrainingCategory, thunkAPI) => {
    console.log("createTrainingCategoryAction data: ", data);
    try {
      const response = await createCategory(data);
      console.log("createTrainingCategoryAction response: ", response);
      if (data.cover) {
        const cover = await updateCategoryCover(
          response.data.result.id,
          data.cover![0]
        );
        console.log("cover:", cover);
        // FIXME: image path
        response.data.result.cover =
          "/images/covers/" + cover.data.result.filename;
      }
      // Dispatch notification
      if (response)
        thunkAPI.dispatch(
          notificationShowAction({
            type: "warning",
            title: "Category",
            message: "created successfully",
            time: 3000,
          })
        );
      return response.data;
    } catch (err: any) {
      // Send AxiosError response message
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

export const readTrainingCategoryAction = createAsyncThunk(
  "categories/read",
  async (id: string, thunkAPI) => {
    try {
      const response = await readCategory(id);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainings Category Error: " + err);
    }
  }
);

export const updateTrainingCategoryAction = createAsyncThunk(
  "categories/update",
  async (data: UpdateTrainingCategory, thunkAPI) => {
    try {
      const response = await updateCategory(data);
      if (data.cover) {
        const cover = await updateCategoryCover(
          response.data.result.id,
          data.cover![0]
        );
        console.log("cover:", cover);
        // FIXME: image path
        response.data.result.cover =
          "/images/covers/" + cover.data.result.filename;
      }
      // Dispatch notification
      if (response)
        thunkAPI.dispatch(
          notificationShowAction({
            type: "info",
            title: "Category",
            message: "updated successfully",
            time: 3000,
          })
        );
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainings Error: " + err);
    }
  }
);

export const deleteTrainingCategoryAction = createAsyncThunk(
  "categories/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await deleteCategory(id);
      // Dispatch notification
      if (response)
        thunkAPI.dispatch(
          notificationShowAction({
            type: "info",
            title: "Category",
            message: "deleted successfully",
            time: 3000,
          })
        );
      // return the id as payload
      return id;
    } catch (err) {
      return isRejectedWithValue("Trainings Error: " + err);
    }
  }
);

/**
 * Show a create form modal
 */
export const showTrainingCategoryCreateModalAction = createAction(
  "categories/show-modal",
  (show: boolean) => {
    return {
      payload: show,
    };
  }
);

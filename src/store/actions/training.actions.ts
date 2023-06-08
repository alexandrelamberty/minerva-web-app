import {
  createAction,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { CreateTraining, UpdateTraining } from "../../models/training.model";
import {
  createTraining,
  deleteTraining,
  getAllTrainings,
  readTraining,
  updateTraining,
  updateTrainingCover,
} from "../../services/api-service";
import { notificationShowAction } from "./notification.actions";

export const getAllTrainingsAction = createAsyncThunk(
  "trainings/fetch",
  async (data: { offset: number; limit: number }) => {
    try {
      const response = await getAllTrainings(data);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainings Error: " + err);
    }
  }
);

/**
 * Create a Training and update
 */
export const createTrainingAction = createAsyncThunk(
  "trainings/create",
  async (data: CreateTraining, thunkAPI) => {
    console.log("createTrainingAction data: ", data);
    try {
      // Call api to create a training
      const response = await createTraining(data);
      console.log("CreateTraining response: ", response);

      // Check if the user submitted a cover
      if (data.cover) {
        // Update the training cover
        const cover = await updateTrainingCover(
          response.data.result.id,
          data.cover[0]
        );
        console.log("cover:", cover);
        // Update the CreateTrainingResponse response with the CreateTrainingCoverResponse
        response.data.result.cover =
          "/images/covers/" + cover.data.result.filename;
      }
      // Dispatch notification
      if (response)
        thunkAPI.dispatch(
          notificationShowAction({
            type: "info",
            title: "Training",
            message: "created successfully",
            time: 3000,
          })
        );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

export const readTrainingAction = createAsyncThunk(
  "trainings/read",
  async (id: string) => {
    try {
      const response = await readTraining(id);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainings Error: " + err);
    }
  }
);

export const updateTrainingAction = createAsyncThunk(
  "trainings/update",
  async (data: UpdateTraining, thunkAPI) => {
    try {
      const response = await updateTraining(data);
      // dispatch notification
      if (response.data)
        thunkAPI.dispatch(
          notificationShowAction({
            type: "info",
            title: "Training",
            message: "updated successfully",
            time: 3000,
          })
        );
      // payload
      return response.data;
    } catch (err) {
      // payload
      return isRejectedWithValue("Trainings Error: " + err);
    }
  }
);

export const deleteTrainingAction = createAsyncThunk(
  "trainings/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await deleteTraining(id);
      // Dispatch notification
      if (response)
        thunkAPI.dispatch(
          notificationShowAction({
            type: "info",
            title: "Training",
            message: "updated successfully",
            time: 3000,
          })
        );
      // return id as payload
      return id;
    } catch (err) {
      return isRejectedWithValue("Trainings Error: " + err);
    }
  }
);

/**
 * Show a create form modal
 */
export const showTrainingCreateModalAction = createAction(
  "trainings/show-create-modal",
  (show: boolean) => {
    return {
      payload: show,
    };
  }
);

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

export const getAllTrainingsAction = createAsyncThunk(
  "trainings/fetch",
  async () => {
    try {
      const response = await getAllTrainings();
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
    try {
      // Call api to create a training
      const response = await createTraining(data);
      console.log(response);

      // Update cover
      if (data.cover) {
        const cover = await updateTrainingCover(
          response.data.result.id,
          data.cover![0]
        );
        response.data.cover = cover.data.filename;
      }
      return response.data;
    } catch (err: any) {
      if (err.code === "ERR_BAD_REQUEST") {
        const messages = err.response.data.msg.toString();
        return thunkAPI.rejectWithValue(messages);
      } else if (err.message) return thunkAPI.rejectWithValue(err.message);
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
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainings Error: " + err);
    }
  }
);

export const deleteTrainingAction = createAsyncThunk(
  "trainings/delete",
  async (id: string) => {
    try {
      const response = await deleteTraining(id);
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

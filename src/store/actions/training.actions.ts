import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { CreateTraining, UpdateTraining } from "../../models/training.model";
import {
  createTraining,
  deleteTraining,
  getAllTrainings,
  readTraining,
  updateTraining,
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

export const createTrainingAction = createAsyncThunk(
  "trainings/create",
  async (data: CreateTraining) => {
    try {
      const response = await createTraining(data);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainings Error: " + err);
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
  async (data: UpdateTraining) => {
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
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Trainings Error: " + err);
    }
  }
);

import {
  createAction,
  createAsyncThunk,
  isRejectedWithValue,
  nanoid,
} from "@reduxjs/toolkit";
import { Training } from "../../models/training.model";

export const trainingsFetchAction = createAsyncThunk(
  "trainings/fetch",
  async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/", {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (err) {
      // You can choose to use the message attached to err or write a custom error
      return isRejectedWithValue("Opps there seems to be an error");
    }
  }
);

// FIXME: Product Type
export const trainingsInsertAction = createAction(
  "training/insert",
  (training: Training) => {
    return {
      payload: {
        ...training,
      },
    };
  }
);

export const trainingsDeleteAction = createAction<string>("training/delete");

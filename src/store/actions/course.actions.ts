import {
  createAction,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { Course } from "../../models/course.model";

export const courseGetAllAction = createAsyncThunk("course/fetch", async () => {
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
});

export const courseCreateAction = createAction(
  "courses/create",
  (course: Course) => {
    return {
      payload: {
        ...course,
      },
    };
  }
);

export const courseReadAction = createAction(
  "courses/read",
  (course: Course) => {
    return {
      payload: {
        ...course,
      },
    };
  }
);

export const courseUpdateAction = createAction(
  "products/update",
  (product: Course) => {
    return {
      payload: {
        ...product,
      },
    };
  }
);

export const courseDeleteAction = createAction<string>("courses/delete");

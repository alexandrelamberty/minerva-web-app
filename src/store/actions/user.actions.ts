import {
  createAction,
  createAsyncThunk,
  isRejectedWithValue,
  nanoid,
} from "@reduxjs/toolkit";
import { User } from "../../models/user.model";

export const usersFetchAction = createAsyncThunk("users/fetch", async () => {
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

export const usersInsertAction = createAction("users/insert", (user: User) => {
  return {
    payload: {
      ...user,
      id: nanoid(),
    },
  };
});

export const usersDeleteAction = createAction<string>("users/delete");

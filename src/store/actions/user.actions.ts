import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { getAllUsers } from "../../services/api-service";

export const getAllUsersAction = createAsyncThunk("users/fetch", async () => {
  try {
    const response = await getAllUsers();
    return response.data;
  } catch (err) {
    return isRejectedWithValue("Users Error: " + err);
  }
});

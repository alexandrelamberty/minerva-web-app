import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { getAllUsers } from "../../services/api-service";
import { formatError } from "../../utils/utils";

export const getAllUsersAction = createAsyncThunk("users/fetch", async () => {
  try {
    const response = await getAllUsers();
    return response.data;
  } catch (err: any) {
    const message = formatError(err);
    return isRejectedWithValue(message);
  }
});

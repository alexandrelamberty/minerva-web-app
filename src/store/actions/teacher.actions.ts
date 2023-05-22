import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { getAllTeachers } from "../../services/api-service";
import { formatError } from "../../utils/utils";

export const getAllTeachersAction = createAsyncThunk(
  "teachers/fetch",
  async () => {
    try {
      const response = await getAllTeachers();
      return response.data;
    } catch (err: any) {
      const message = formatError(err);
      return isRejectedWithValue(message);
    }
  }
);

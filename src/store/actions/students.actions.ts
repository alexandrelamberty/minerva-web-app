import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { getAllStudents } from "../../services/api-service";
import { formatError } from "../../utils/utils";

export const getAllStudentsAction = createAsyncThunk(
  "teachers/fetch",
  async () => {
    try {
      const response = await getAllStudents();
      return response.data;
    } catch (err: any) {
      const message = formatError(err);
      return isRejectedWithValue(message);
    }
  }
);

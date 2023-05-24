import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { getAllTeachers, getTeacherById } from "../../services/api-service";
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

export const getTeacherByIdAction = createAsyncThunk(
  "teachers/get-by-id",
  async (id: string) => {
    try {
      const response = await getTeacherById(id);
      return response.data;
    } catch (err: any) {
      const message = formatError(err);
      return isRejectedWithValue(message);
    }
  }
);

import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { getAllStudents, getStudentById } from "../../services/api-service";
import { formatError } from "../../utils/utils";

export const getAllStudentsAction = createAsyncThunk(
  "students/fetch",
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

export const getStudentByIdAction = createAsyncThunk(
  "students/get-by-id",
  async (id: string) => {
    try {
      const response = await getStudentById(id);
      console.log(response);
      return response.data;
    } catch (err: any) {
      const message = formatError(err);
      return isRejectedWithValue(message);
    }
  }
);

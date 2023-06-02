import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { getCategoryDescription } from "../../services/api-service";
import { formatError } from "../../utils/utils";

export const getCategoryDescriptionAction = createAsyncThunk(
  "ai/get-category-description",
  async (terms: string) => {
    try {
      const response = await getCategoryDescription(terms);
      return response.data;
    } catch (err: any) {
      const message = formatError(err);
      return isRejectedWithValue(message);
    }
  }
);

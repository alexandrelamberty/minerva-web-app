import { createReducer } from "@reduxjs/toolkit";
import { getCategoryDescriptionAction } from "../actions/ai.action";

export type AIState = {
  description: string | undefined;
  loading: boolean;
  status: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: AIState = {
  description: "",
  loading: false,
  status: "idle",
  errors: null,
};

const aiReducer = createReducer(initialState, (builder) => {
  builder
    // Get Category Description
    .addCase(getCategoryDescriptionAction.pending, (state, action) => {
      state.loading = true;
      state.status = "pending";
    })
    .addCase(getCategoryDescriptionAction.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
    })
    .addCase(getCategoryDescriptionAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.status = "idle";
      state.description = String(payload.description).trim();
    });
});

export default aiReducer;

import { createReducer } from "@reduxjs/toolkit";
import { getAllUsersAction } from "../actions/user.actions";
import { User } from "../../models/user.model";

export type UsersState = {
  users: User[];
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: UsersState = {
  users: [],
  count: 0,
  loading: "idle",
  errors: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllUsersAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(getAllUsersAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(getAllUsersAction.fulfilled, (state, { payload }) => {
      state.users = payload.results;
      state.count = state.users.length;
      state.loading = "idle";
    });
});

export default userReducer;

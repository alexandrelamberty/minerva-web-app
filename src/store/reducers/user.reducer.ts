import { createReducer } from "@reduxjs/toolkit";
import { getAllUsersAction, getUserByIdAction } from "../actions/user.actions";
import { User } from "../../models/user.model";

export type UsersState = {
  users: User[];
  user: User | null;
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: UsersState = {
  users: [],
  user: null,
  count: 0,
  loading: "idle",
  errors: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Get All
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
    })
    // Get User By Id
    .addCase(getUserByIdAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(getUserByIdAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(getUserByIdAction.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.user = payload.result;
    });
});

export default userReducer;

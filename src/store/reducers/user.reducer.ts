import { createReducer } from "@reduxjs/toolkit";
import {
  usersDeleteAction,
  usersInsertAction,
  usersFetchAction,
} from "../actions/user.actions";

import USERS from "../mock-data/users.json";

export type ProductsState = {
  users: any[];
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: ProductsState = {
  users: USERS,
  count: 0,
  loading: "idle",
  errors: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(usersFetchAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(usersFetchAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(usersFetchAction.fulfilled, (state, { payload }) => {
      console.log("REDUCER", payload);
      state.users = state.users.concat(payload);
      state.count = state.users.length;
      state.loading = "idle";
    })
    .addCase(usersInsertAction, (state, action) => {
      const user = action.payload;
      state.users.push(user);
      state.count = state.users.length;
    })
    .addCase(usersDeleteAction, (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
      state.count = state.users.length;
    });
});

export default userReducer;

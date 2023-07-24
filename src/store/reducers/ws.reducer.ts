import { createReducer } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { User } from "../../models/user.model";

export type WSState = {
  ws: Socket | null;
  user: User | null;
  count: number;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: WSState = {
  ws: null,
  user: null,
  count: 0,
  loading: "idle",
  errors: null,
};

const userReducer = createReducer(initialState, (builder) => {
  // builder
  //   // Get All
  //   .addCase(connectWSAction, (state, action) => {
  //     state.loading = "pending";
  //   });
});

export default userReducer;

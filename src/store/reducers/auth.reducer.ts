import { createReducer } from "@reduxjs/toolkit";
import {
  authLoginAction,
  authLogoutAction,
  authRegisterAction,
} from "../actions/auth.actions";
import { LoggedInUser } from "../../models/user.model";

export type AuthState = {
  loggedInUser: LoggedInUser | null;
  loading: boolean;
  status: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: AuthState = {
  loggedInUser: null,
  loading: false,
  status: "idle",
  errors: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(authLoginAction.pending, (state, action) => {
      state.loading = true;
      state.status = "pending";
      state.errors = null;
    })
    .addCase(authLoginAction.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.errors = action.payload as string;
    })
    .addCase(authLoginAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.status = "succeeded";
      state.errors = null;
      console.log(payload);
      state.loggedInUser = {
        ...payload.result.user,
        token: payload.result.token,
      };
    })
    // Register
    .addCase(authRegisterAction.pending, (state, action) => {
      state.loading = true;
      state.status = "pending";
      state.errors = null;
    })
    .addCase(authRegisterAction.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.errors = action.payload as string;
    })
    .addCase(authRegisterAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.status = "succeeded";
      state.loggedInUser = {
        ...payload.result.user,
        token: payload.result.token,
      };
    })
    // Log-out
    .addCase(authLogoutAction, (state, action) => {
      state.loggedInUser = null;
    });
});

export default authReducer;

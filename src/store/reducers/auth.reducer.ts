import { createReducer } from "@reduxjs/toolkit";
import { UserLoggedIn } from "../../models/user-logged-in.model";
import {
  authFakeLoginAction,
  authLoginAction,
  authLogoutAction,
} from "../actions/auth.actions";

import ADMIN_USER from "../mock-data/logged-in-user-admin.json";
import TEACHER_USER from "../mock-data/logged-in-user-teacher.json";
import STUDENT_USER from "../mock-data/logged-in-user-student.json";

export type ProductsState = {
  user: UserLoggedIn | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  errors: string | null;
};

const initialState: ProductsState = {
  user: null,
  loading: "idle",
  errors: null,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authLoginAction.pending, (state, action) => {
      state.loading = "pending";
    })
    .addCase(authLoginAction.rejected, (state, action) => {
      state.loading = "failed";
    })
    .addCase(authLoginAction.fulfilled, (state, { payload }) => {
      // state.products = state.products.concat(payload);
      state.loading = "idle";
    })
    .addCase(authFakeLoginAction, (state, action) => {
      state.user = STUDENT_USER;
      // state.user = TEACHER_USER;
    })
    .addCase(authLogoutAction, (state, action) => {
      state.user = null;
    });
});

export default authReducer;

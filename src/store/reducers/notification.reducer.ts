import { createReducer } from "@reduxjs/toolkit";
import {
  notificationHideAction,
  notificationShowAction,
} from "../actions/notification.actions";

export type NotificationStateType = "info" | "success" | "warning";

export type NotificationState = {
  type: NotificationStateType;
  show: boolean;
  title: string;
  message: string;
  time: number;
  count: number;
  errors: string | null;
};

const initialState: NotificationState = {
  type: "info",
  show: false,
  title: "",
  message: "",
  time: 3000,
  count: 0,
  errors: null,
};

const notificationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(notificationShowAction, (state, { payload }) => {
      state.type = payload.type;
      state.title = payload.title;
      state.message = payload.message;
      state.time = payload.time;
      state.show = true;
    })
    .addCase(notificationHideAction, (state, action) => {
      state.type = "info";
      state.title = "";
      state.message = "";
      state.time = 1000;
      state.show = false;
    });
});

export default notificationReducer;

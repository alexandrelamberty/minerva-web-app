import { createReducer } from "@reduxjs/toolkit";
import {
  notificationHideAction,
  notificationShowAction,
} from "../actions/notification.actions";

export type NotificationStateType = "info" | "success" | "warning";

export type NotificationState = {
  show: boolean;
  type: string;
  title: string;
  message: string;
  time: number;
};

const initialState: NotificationState = {
  show: false,
  type: "info",
  title: "test",
  message: "",
  time: 3000,
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

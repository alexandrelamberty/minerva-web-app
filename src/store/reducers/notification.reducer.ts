import { createReducer } from "@reduxjs/toolkit";
import {
  notificationHideAction,
  notificationShowAction,
} from "../actions/notification.actions";

export type NotificationState = {
  show: boolean;
  time: number;
  count: number;
  errors: string | null;
};

const initialState: NotificationState = {
  show: false,
  time: 3000,
  count: 0,
  errors: null,
};

const notificationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(notificationShowAction, (state, action) => {
      state.time = action.payload.time;
      state.show = true;
    })
    .addCase(notificationHideAction, (state, action) => {
      state.show = false;
    });
});

export default notificationReducer;

import { createAction } from "@reduxjs/toolkit";
import { NotificationStateType } from "../reducers/notification.reducer";

// FIXME Add type and text for the Alert
export const notificationShowAction = createAction(
  "notification/show",
  ({
    title,
    message,
    time,
    type,
  }: {
    title: string;
    message: string;
    time: number;
    type: NotificationStateType;
  }) => {
    return {
      payload: {
        type,
        title,
        message,
        time,
      },
    };
  }
);

export const notificationHideAction = createAction("notification/hide");

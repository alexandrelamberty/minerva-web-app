import { createAction } from "@reduxjs/toolkit";

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
    time: string;
    type: string;
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

import { createAction } from "@reduxjs/toolkit";

// FIXME Add type and text for the Alert
export const notificationShowAction = createAction(
  "notification/show",
  (time: number) => {
    return {
      payload: {
        time,
      },
    };
  }
);

export const notificationHideAction = createAction("notification/hide");

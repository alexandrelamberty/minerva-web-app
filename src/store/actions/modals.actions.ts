import { createAction } from "@reduxjs/toolkit";

type ActionProps = {
  title: string;
  message: string;
  id: string;
  action: string;
  callback: () => void;
};

export const showActionModalAction = createAction(
  "modals/show",
  ({ title, message, id, action, callback }: ActionProps) => {
    return {
      payload: {
        title,
        message,
        id,
        action,
        callback,
      },
    };
  }
);

export const acceptActionModalAction = createAction("modals/accept", () => {
  return {
    payload: {
      show: false,
    },
  };
});

export const declineActionModalAction = createAction("modals/decline", () => {
  return {
    payload: {
      show: false,
    },
  };
});

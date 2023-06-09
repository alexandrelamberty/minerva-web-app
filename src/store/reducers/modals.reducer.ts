import { createReducer } from "@reduxjs/toolkit";
import {
  acceptActionModalAction,
  declineActionModalAction,
  showActionModalAction,
} from "../actions/modals.actions";

export type NotificationStateType = "info" | "success" | "warning";

export type ModalState = {
  show: boolean;
  title: string;
  message: string;
  id: string;
  action: string;
  errors: string | null;
};

const initialState: ModalState = {
  show: false,
  title: "",
  message: "",
  id: "",
  action: "",
  errors: null,
};

const modalReducer = createReducer(initialState, (builder) => {
  // const dispatch = useDispatch<AppDispatch>();
  builder
    .addCase(showActionModalAction, (state, { payload }) => {
      state.title = payload.title;
      state.message = payload.message;
      state.action = payload.action;
      state.id = payload.id;
      state.show = true;
    })
    .addCase(acceptActionModalAction, (state, { payload }) => {
      state.title = "";
      state.message = "";
      state.show = false;
      // dispatch action
      // dispatch();
    })
    .addCase(declineActionModalAction, (state, { payload }) => {
      state.title = "";
      state.message = "";
      state.show = false;
    });
});

export default modalReducer;

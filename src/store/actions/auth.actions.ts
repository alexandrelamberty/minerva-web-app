import {
  createAction,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import {
  LoginUserRequest,
  RecoverUserPasswordRequest,
  RegisterUserRequest,
} from "../../models/user.model";
import {
  loginUser,
  recoverUserAccount,
  registerUser,
} from "../../services/api-service";
import { formatError } from "../../utils/utils";

export const authLoginAction = createAsyncThunk(
  "auth/login",
  async (data: LoginUserRequest, thunkAPI) => {
    console.log("AuthLoginAction: ", data);
    try {
      const response = await loginUser(data);
      return response.data;
    } catch (err: any) {
      const message = formatError(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authRegisterAction = createAsyncThunk(
  "auth/register",
  async (data: RegisterUserRequest, thunkAPI) => {
    try {
      const response = await registerUser(data);
      return response.data;
    } catch (err: any) {
      const message = formatError(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authRecoverPasswordAction = createAsyncThunk(
  "auth/recover-account",
  async (data: RecoverUserPasswordRequest, thunkAPI) => {
    try {
      const response = await recoverUserAccount(data);
      return response.data;
    } catch (err: any) {
      const message = formatError(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authLogoutAction = createAction("auth/logout");

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

export const authLoginAction = createAsyncThunk(
  "auth/login",
  async (data: LoginUserRequest, thunkAPI) => {
    console.log("Action data: ", data);
    try {
      const response = await loginUser(data);
      return response.data;
    } catch (err: any) {
      console.log(err);
      if (err.code === "ERR_BAD_REQUEST") {
        const messages = err.response.data.msg.toString();
        return thunkAPI.rejectWithValue(messages);
      } else if (err.message) return thunkAPI.rejectWithValue(err.message);
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
      if (err.code === "ERR_BAD_REQUEST") {
        const messages = err.response.data.msg.toString();
        return thunkAPI.rejectWithValue(messages);
      } else if (err.message) return thunkAPI.rejectWithValue(err.message);
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
      if (err.code === "ERR_BAD_REQUEST") {
        const messages = err.response.data.msg.toString();
        return thunkAPI.rejectWithValue(messages);
      } else if (err.message) return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const authLogoutAction = createAction("auth/logout");
export const authFakeLoginAction = createAction("auth/fakelogin");

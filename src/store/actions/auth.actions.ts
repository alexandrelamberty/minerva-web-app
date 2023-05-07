import {
  createAction,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const authLoginAction = createAsyncThunk("auth/login", async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products/", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    // You can choose to use the message attached to err or write a custom error
    return isRejectedWithValue("Opps there seems to be an error");
  }
});

export const authFakeLoginAction = createAction("auth/fakelogin");
export const authRegisterAction = createAction("auth/register");
export const authRecoverAccountAction = createAction("auth/recover-account");
export const authLogoutAction = createAction("auth/logout");

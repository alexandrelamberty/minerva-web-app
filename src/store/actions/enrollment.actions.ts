import {
  createAction,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import {
  CreateEnrollment,
  UpdateEnrollment,
} from "../../models/enrollment.model";

import {
  createEnrollment,
  deleteEnrollment,
  getAllEnrollments,
  readEnrollment,
  updateEnrollment,
} from "../../services/api-service";

export const getAllEnrollmentsAction = createAsyncThunk(
  "enrollments/fetch",
  async () => {
    try {
      const response = await getAllEnrollments();
      console.log(response);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Enrollments Error: " + err);
    }
  }
);

/**
 * Create a Enrollment and update
 */
export const createEnrollmentAction = createAsyncThunk(
  "enrollments/create",
  async (data: CreateEnrollment, thunkAPI) => {
    console.log("createEnrollmentAction data: ", data);
    try {
      // Call api to create a training
      const response = await createEnrollment(data);
      console.log("CreateEnrollment response: ", response);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

export const readEnrollmentAction = createAsyncThunk(
  "enrollments/read",
  async (id: string) => {
    try {
      const response = await readEnrollment(id);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Enrollments Error: " + err);
    }
  }
);

export const updateEnrollmentAction = createAsyncThunk(
  "enrollments/update",
  async (data: UpdateEnrollment, thunkAPI) => {
    try {
      const response = await updateEnrollment(data);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Enrollments Error: " + err);
    }
  }
);

export const deleteEnrollmentAction = createAsyncThunk(
  "enrollments/delete",
  async (id: string) => {
    try {
      const response = await deleteEnrollment(id);
      // return id as payload
      return id;
    } catch (err) {
      return isRejectedWithValue("Enrollments Error: " + err);
    }
  }
);

/**
 * Show a create form modal
 */
export const showEnrollmentCreateModalAction = createAction(
  "enrollments/show-create-modal",
  (show: boolean) => {
    return {
      payload: show,
    };
  }
);

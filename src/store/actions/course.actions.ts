import {
  createAction,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { CreateCourse, UpdateCourse } from "../../models/course.model";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  readCourse,
  updateCourse,
} from "../../services/api-service";
import { notificationShowAction } from "./notification.actions";

export const getAllCoursesAction = createAsyncThunk(
  "courses/fetch",
  async () => {
    try {
      const response = await getAllCourses();
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Courses Error: " + err);
    }
  }
);

export const createCourseAction = createAsyncThunk(
  "courses/create",
  async (data: CreateCourse, thunkAPI) => {
    try {
      const response = await createCourse(data);
      // Dispatch notification
      if (response)
        thunkAPI.dispatch(
          notificationShowAction({
            type: "info",
            title: "Course",
            message: "created successfully",
            time: 3000,
          })
        );
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Courses Error: " + err);
    }
  }
);

export const readCourseAction = createAsyncThunk(
  "courses/read",
  async (id: string) => {
    try {
      const response = await readCourse(id);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Courses Error: " + err);
    }
  }
);

export const updateCourseAction = createAsyncThunk(
  "courses/update",
  async (data: UpdateCourse, thunkAPI) => {
    try {
      const response = await updateCourse(data);
      // Dispatch notification
      if (response)
        thunkAPI.dispatch(
          notificationShowAction({
            type: "info",
            title: "Course",
            message: "updated successfully",
            time: 3000,
          })
        );
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Courses Error: " + err);
    }
  }
);

export const deleteCourseAction = createAsyncThunk(
  "courses/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await deleteCourse(id);
      // Dispatch notification
      if (response)
        thunkAPI.dispatch(
          notificationShowAction({
            type: "info",
            title: "Course",
            message: "deleted successfully",
            time: 3000,
          })
        );
      // Return the id of the course successfully deleted
      return id;
    } catch (err) {
      return isRejectedWithValue("Courses Error: " + err);
    }
  }
);

/**
 * Show a create form modal
 */
export const showCourseCreateModalAction = createAction(
  "courses/show-create-modal",
  (show: boolean) => {
    return {
      payload: show,
    };
  }
);

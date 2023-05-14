import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { CreateCourse, UpdateCourse } from "../../models/course.model";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  readCourse,
  updateCourse,
} from "../../services/api-service";

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
  async (data: CreateCourse) => {
    try {
      const response = await createCourse(data);
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
  async (data: UpdateCourse) => {
    try {
      const response = await updateCourse(data);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Courses Error: " + err);
    }
  }
);

export const deleteCourseAction = createAsyncThunk(
  "courses/delete",
  async (id: string) => {
    try {
      const response = await deleteCourse(id);
      return response.data;
    } catch (err) {
      return isRejectedWithValue("Courses Error: " + err);
    }
  }
);

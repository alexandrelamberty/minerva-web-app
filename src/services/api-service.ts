import { CreateCourse, UpdateCourse } from "../models/course.model";
import {
  CreateTrainingCategory,
  UpdateTrainingCategory,
} from "../models/training-category.model";
import { CreateTraining, UpdateTraining } from "../models/training.model";
import {
  LoginUserRequest,
  RecoverUserPasswordRequest,
  RegisterUserRequest,
} from "../models/user.model";
import axios from "axios";

export interface AxiosError {
  code: string;
  config: {};
  message: string;
  name: string;
  response: {
    data: {
      msg: string[];
    };
  };
}

const URL = "http://localhost:3000";

const instanceAxios = axios.create({
  baseURL: "http://localhost:3000",
});

// Auth

export const loginUser = (data: LoginUserRequest) => {
  return instanceAxios.post(URL + "/auth/login", data);
};

export const registerUser = async (data: RegisterUserRequest) => {
  return await instanceAxios.post(URL + "/auth/register", data);
};

export const recoverUserAccount = async (data: RecoverUserPasswordRequest) => {
  return await instanceAxios.post(URL + "/auth/register", data);
};

// Training Categories

export const getAllCategories = async () => {
  return await instanceAxios.get("/categories/");
};

export const createCategory = async (data: CreateTrainingCategory) => {
  return await instanceAxios.post("/categories", data);
};

export const readCategory = async (id: string) => {
  return await instanceAxios.get("/categories/" + id);
};

export const updateCategory = async (data: UpdateTrainingCategory) => {
  return await instanceAxios.patch("/categories/", data);
};

export const deleteCategory = async (id: string) => {
  return await instanceAxios.delete("/categories/" + id);
};

// Trainings

export const getAllTrainings = async () => {
  return await instanceAxios.get("/trainings/");
};

export const createTraining = async (data: CreateTraining) => {
  return await instanceAxios.post("/trainings", data);
};

export const readTraining = async (id: string) => {
  return await instanceAxios.get("/trainings/" + id);
};

export const updateTraining = async (data: UpdateTraining) => {
  return await instanceAxios.patch("/trainings", data);
};

export const deleteTraining = async (id: string) => {
  return await instanceAxios.delete("/trainings/" + id);
};

// Courses

export const getAllCourses = async () => {
  return await instanceAxios.get("/courses/");
};

export const createCourse = async (data: CreateCourse) => {
  return await instanceAxios.post("/courses", data);
};

export const readCourse = async (id: string) => {
  return await instanceAxios.get("/courses/" + id);
};

export const updateCourse = async (data: UpdateCourse) => {
  return await instanceAxios.patch("/courses", data);
};

export const deleteCourse = async (id: string) => {
  return await instanceAxios.delete("/courses/" + id);
};

// Course dates

// Course dates attendances

// Course materials

// Users

export const getAllUsers = async () => {
  return await instanceAxios.get("/users/");
};

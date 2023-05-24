import { useDispatch } from "react-redux";
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
  UsersSuccessResponse,
} from "../models/user.model";
import axios from "axios";
import { CreateEnrollment, UpdateEnrollment } from "../models/enrollment.model";

export interface AxiosError {
  code: string;
  config: any;
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

export const searchCategories = async (terms: string) => {
  return await instanceAxios.get("/categories/search/" + terms);
};

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

export const updateCategoryCover = async (id: string, file: File) => {
  console.log(file);
  // Create the form data and add appropriate headers
  const formData = new FormData();
  if (file) formData.append("cover", file);
  return await instanceAxios.post("/categories/" + id + "/cover", formData);
};

// Trainings

export const searchTrainings = async (terms: string) => {
  return await instanceAxios.get("/trainings/search/" + terms);
};

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

export const updateTrainingCover = async (id: string, file: File) => {
  console.log(file);
  // Create the form data and add appropriate headers
  const formData = new FormData();
  if (file) formData.append("cover", file);
  return await instanceAxios.post("/trainings/" + id + "/cover", formData);
};

// Courses

export const searchCourses = async (terms: string) => {
  return await instanceAxios.get("/courses/search/" + terms);
};

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

export const updateCourseCover = async (id: string, file: File) => {
  console.log(file);
  // Create the form data and add appropriate headers
  const formData = new FormData();
  if (file) formData.append("cover", file);
  return await instanceAxios.post("/trainings/" + id + "/cover", formData);
};

// Course dates

// Course dates attendances

// Course materials

// Teachers

export const searchTeachers = async (terms: string) => {
  return await instanceAxios.get("/teachers/");
};

export const getAllTeachers = async () => {
  return await instanceAxios.get("/teachers/");
};

export const getTeacherById = async (id: string) => {
  return await instanceAxios.get("/teachers/" + id);
};

// Students

export const searchStudents = async (terms: string) => {
  return await instanceAxios.get("/students/search/" + terms);
};

export const getAllStudents = async () => {
  return await instanceAxios.get("/students/");
};

export const getStudentById = async (id: string) => {
  return await instanceAxios.get("/students/" + id);
};

// Enrollments

export const searchEnrollments = async (terms: string) => {
  return await instanceAxios.get("/enrollment/search/" + terms);
};

export const getAllEnrollments = async () => {
  return await instanceAxios.get("/enrollments");
};

export const createEnrollment = async (data: CreateEnrollment) => {
  return await instanceAxios.post("/enrollments", data);
};

export const readEnrollment = async (id: string) => {
  return await instanceAxios.get("/enrollments/" + id);
};

export const updateEnrollment = async (data: UpdateEnrollment) => {
  return await instanceAxios.patch("/enrollments", data);
};

export const deleteEnrollment = async (id: string) => {
  return await instanceAxios.delete("/enrollments/" + id);
};

// Users

export const searchUsers = async (terms: string) => {
  return await instanceAxios.get("/users/search/" + terms);
};

export const getAllUsers = async () => {
  return await instanceAxios.get("/users/");
};

export const getUserById = async (id: string) => {
  return await instanceAxios.get("/users/" + id);
};

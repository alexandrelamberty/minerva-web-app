import { UserRole } from "../enums/user-roles";
import { Settings } from "./settings.model";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoggedInUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  token: string;
  settings?: Settings;
}

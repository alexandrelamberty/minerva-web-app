import { UserRole } from "../enums/user-roles";
import { Settings } from "./settings.model";

/**
 * A User in the system
 */
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar: string;
}

/**
 * The User logged in the web application
 */
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

/**
 * User login request
 */
export interface LoginUserRequest {
  email: string;
  password: string;
}

/**
 * User registration request
 */

export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

/**
 * User password recovery request
 */

export interface RecoverUserPasswordRequest {
  email: string;
}

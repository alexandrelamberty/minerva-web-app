import { UserRole } from "../enums/user-roles";
import { Settings } from "./settings.model";

/**
 * A User in the system
 */
export interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * An Admin in the system
 */
// FIXME: Good ?
export interface Admin {
  id: string;
  isBot: boolean;
  User: User;
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

/**
 * User invite request
 */

export interface InviteUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

/**
 * Search user result
 */
export interface UserSearchResult {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
}

/**
 * Search users success response
 */
export interface UsersSearchSuccess {
  results: UserSearchResult[];
  statusCode: number;
}

/**
 * Users success response
 */
export interface UsersSuccessResponse {
  results: User[];
  count: number;
  statusCode: number;
}

/**
 * User success response
 */
export interface UserSuccessResponse {
  result: User;
  statusCode: number;
}

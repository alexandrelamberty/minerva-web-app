import { UserRole, UserRoles } from "../enums/user-roles";
import { Settings } from "./settings.model";

export interface UserLoggedIn {
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

import { UserRole } from "../enums/user-roles";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar: string;
}

import { User } from "./user.model";

export interface Student extends User {
  id: string;
  training: [];
}

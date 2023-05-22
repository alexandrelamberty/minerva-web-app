import { Training } from "./training.model";
import { User } from "./user.model";

export interface Student {
  id: string;
  identification: string;
  firstName: string;
  lastName: string;
  email: string;
  trainings: Training[];
  createdDate: string;
  updatedDate: string;
}

import { Course } from "./course.model";
import { User } from "./user.model";

export interface Teacher {
  id: string;
  company: string;
  courses: Course[];
  User: User;
}

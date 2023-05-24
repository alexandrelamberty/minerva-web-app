import { Course } from "./course.model";
import { User } from "./user.model";

/**
 * Represents a teacher.
 */
export interface Teacher {
  id: string;
  company: string;
  courses: Course[];
  user: User;
}

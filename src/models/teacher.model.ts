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

/**
 * Search teacher result
 */
export interface TeacherSearchResult {
  id: string;
  firstName: string;
  lastName: string;
}

/**
 * Search teachers success response
 */
export interface TeachersSearchSuccess {
  results: TeacherSearchResult[];
  statusCode: number;
}

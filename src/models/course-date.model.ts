import { CourseDateAttendance } from "./course-date-attendance.model";
import { Course } from "./course.model";
import { User } from "./user.model";

export interface CourseDate {
  id: string;
  course: Course;
  teacher: User;
  date: string;
  attendance: CourseDateAttendance[];
}

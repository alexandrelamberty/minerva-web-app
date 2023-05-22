import { CourseDateAttendance } from "./course-date-attendance.model";
import { Course } from "./course.model";
import { Teacher } from "./teacher.model";
import { User } from "./user.model";

export interface CourseDate {
  id: string;
  course: Course;
  teacher: Teacher;
  date: string;
  attendance: CourseDateAttendance[];
}

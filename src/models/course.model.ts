import { CourseDate } from "./course-date.model";
import { Training } from "./training.model";
import { User } from "./user.model";

export interface Course {
  id: string;
  name: string;
  description: string;
  training: Training;
  teacher: User;
  dates: CourseDate[];
  status: "in progress" | "Completed";
  progress: number;
}

export interface CreateCourse {
  name: string;
  description: string;
  training?: Training;
  teacher?: User;
  dates?: CourseDate[];
}

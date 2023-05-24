import { CourseDate } from "./course-date.model";
import { Training } from "./training.model";
import { Teacher } from "./teacher.model";

export interface Course {
  id: string;
  name: string;
  description: string;
  training: Training;
  teacher: Teacher;
  dates: CourseDate[];
  duration: number;
  startDate: string;
  endDate: string;
  status: "in progress" | "Completed";
  progress: number;
}

export interface CreateCourse {
  name: string;
  description: string;
  Training: Training | null;
  Teacher: Teacher | null;
  dates?: CourseDate[];
}

export interface UpdateCourse {
  name: string;
  description: string;
  TrainingId: string;
  TeacherId: string;
  dates?: CourseDate[];
}

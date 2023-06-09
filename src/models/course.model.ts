import { CourseDate } from "./course-date.model";
import { Teacher } from "./teacher.model";
import { Training } from "./training.model";

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
  cover: string;
}

export interface CreateCourse {
  name: string;
  description: string;
  Training: Training | null;
  Teacher: Teacher | null;
  dates?: CourseDate[];
  cover?: FileList;
}

export interface UpdateCourse {
  name: string;
  description: string;
  TrainingId: string;
  TeacherId: string;
  dates?: CourseDate[];
}

/**
 * Search courses result
 */
export interface CourseSearchResult {
  id: string;
  name: string;
  categoryName: string;
}

/**
 * Search courses success response
 */
export interface CoursesSearchSuccess {
  results: CourseSearchResult[];
  statusCode: number;
}

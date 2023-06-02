import { Course } from "./course.model";
import { Teacher } from "./teacher.model";
import { TrainingCategory } from "./training-category.model";

export interface Training {
  id: string;
  name: string;
  description: string;
  cover: string;
  category: TrainingCategory;
  duration: number;
  startDate: string;
  endDate: string;
  courses?: Course[];
  teacher: Teacher;
}

export interface CreateTraining {
  name: string;
  description: string;
  cover: FileList;
  startDate: string;
  endDate: string;
  TrainingCategoryId: string;
}

export interface UpdateTraining {
  name: string;
  description: string;
  cover: FileList;
  startDate: string;
  endDate: string;
  TrainingCategoryId: string;
}

import { Course } from "./course.model";
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
}

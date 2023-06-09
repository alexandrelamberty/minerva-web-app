import { Course } from "./course.model";
import { Training } from "./training.model";

/**
 * Represent a training category with all his attributes.
 */
export interface TrainingCategory {
  id: string;
  name: string;
  description?: string;
  cover?: string;
  trainings?: Training[];
}

/**
 * Create training request
 */
export interface CreateTrainingCategory {
  name: string;
  description: string;
  cover?: FileList;
}

/**
 * Update training request
 */
export interface UpdateTrainingCategory {
  name?: string;
  description?: string;
  cover?: FileList;
  category?: TrainingCategory;
  courses?: Course[];
}

/**
 * List training result
 */
// FIXME: Naming
export interface CategoryListResult {
  id: string;
  firstName: string;
  lastName: string;
}

/**
 * List training success response
 */
// FIXME: Naming
export interface CategoriesListSuccess {
  results: CategoryListResult[];
  statusCode: number;
}

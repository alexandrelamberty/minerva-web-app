import { Training } from "./training.model";

export interface Student {
  id: string;
  identification: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  trainings: Training[];
  createdDate: string;
  updatedDate: string;
}

/**
 * Search student result
 */
export interface StudentSearchResult {
  id: string;
  identification: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

/**
 * Search student success response
 */
export interface StudentSearchSuccess {
  results: StudentSearchResult[];
  statusCode: number;
}

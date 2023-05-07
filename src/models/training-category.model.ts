import { Training } from "./training.model";

export interface TrainingCategory {
  id: string;
  name: string;
  description?: string;
  cover?: string;
  trainings?: Training[];
}

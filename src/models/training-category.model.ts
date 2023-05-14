import { Training } from "./training.model";

export interface TrainingCategory {
  id: string;
  name: string;
  description?: string;
  cover?: string;
  trainings?: Training[];
}

export interface CreateTrainingCategory {
  name: string;
  description: string;
  cover?: File;
}

export interface UpdateTrainingCategory {
  name: string;
  description?: string;
  cover?: File;
}

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
  cover?: FileList;
}

export interface UpdateTrainingCategory {
  name: string;
  description?: string;
  cover?: FileList;
}

import { Student } from "./student.model";
import { Training } from "./training.model";

export interface Enrollment {
  id: string;
  validated: string;
  status: string;
  student: Student;
  training: Training;
}

export interface CreateEnrollment {
  training: Training;
  student: Student;
}

export interface UpdateEnrollment {
  training: Training;
  student: Student;
}

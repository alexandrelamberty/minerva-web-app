export type UserRoles = UserRole.Admin | UserRole.Teacher | UserRole.Student;

export enum UserRole {
  Admin = "Admin",
  Teacher = "Teacher",
  Student = "Student",
}

export interface Settings {
  theme: "dark" | "light";
  keepLoggedIn: boolean;
  notifications: boolean;
  trainings?: {
    view: string; // card | table
  };
  courses?: {
    view: string; // card | table
  };
  schedule?: {
    view: string; // day | month | week | year
  };
  teachers?: {
    view: string; // card | table
  };
  students?: {
    view: string; // card | table
  };
  users?: {
    view: string; // card | table
  };
}

import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AppNotification from "./components/app-notification/app-notification";
import { AccountRecoveryForm } from "./components/forms/account-recovery-form/account-recovery-form";
import { LoginForm } from "./components/forms/login-form/login-form";
import { FormRegister } from "./components/forms/register-form/register-form";
import Layout from "./containers/app-layout/app-layout";
import PublicLayout from "./containers/app-public-layout/public-layout";
import ProtectedRoute from "./containers/protected-route/protected-route";
import AdminPage from "./pages/admin/admin.page";
import CategoriesPage from "./pages/categories/categories.page";
import CategoryDetailsPage from "./pages/categories/category-details.page";
import CategoryEditPage from "./pages/categories/category-edit.page";
import CourseDetailsPage from "./pages/course/course-details.page";
import CourseEditPage from "./pages/course/course-edit.page";
import CoursesPage from "./pages/course/courses.page";
import DashboardPage from "./pages/dashboard/dashboard.page";
import EnrollmentsPage from "./pages/enrollments/enrollments.page";
import NotFoundPage from "./pages/not-found/not-found.page";
import ProfilePage from "./pages/profile/profile.page";
import SchedulePage from "./pages/schedule/schedule.page";
import SettingsPage from "./pages/settings/settings.page";
import StudentDetailsPage from "./pages/students/student-details.page";
import StudentsPage from "./pages/students/students.page";
import TeacherDetailsPage from "./pages/teachers/teacher-details.page";
import TeachersPages from "./pages/teachers/teachers.page";
import TrainingDetailsPage from "./pages/trainings/training-details.page";
import TrainingEditPage from "./pages/trainings/training-edit.page";
import TrainingsPage from "./pages/trainings/trainings.page";
import UserDetailsPage from "./pages/users/user-details.page";
import UsersPage from "./pages/users/users.page";
import { RootState } from "./store/store";

function App() {
  // Store notification used to show / hide globals notifications
  const { show, title, message, errors } = useSelector(
    (state: RootState) => state.notification
  );

  return (
    <>
      <Routes>
        {/* 
          Application Public Routes

          - Authentication 
            - login             Account authentication 
            - register          Account creation 
            - forgot-password   Account recovery 
        
        */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<FormRegister />} />
          <Route path="/forgot-password" element={<AccountRecoveryForm />} />
        </Route>

        {/* 
          Application Private Routes 

          - Dashboard
          - Categories
          - Trainings
          - Courses
          - Schedule
          - Teachers
          - Students
          - Enrollments
          - Users
          - Profile
          - Settings
        
        */}
        <Route element={<Layout />}>
          {/* 
            Dashboard 
              - dashboard             User custom dashboard
          */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* 
            Categories
              - categories
              - categories/:id/
              - categories/:id/edit
          */}
          <Route
            path="categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="categories/:categoryId"
            element={
              <ProtectedRoute>
                <CategoryDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="categories/:categoryId/edit"
            element={
              <ProtectedRoute>
                <CategoryEditPage />
              </ProtectedRoute>
            }
          />
          {/* 
            Trainings 
              - trainings
              - trainings/:id/
              - trainings/:id/edit
          */}
          <Route
            path="trainings"
            element={
              <ProtectedRoute>
                <TrainingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="trainings/:trainingId"
            element={
              <ProtectedRoute>
                <TrainingDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="trainings/:trainingId/edit"
            element={
              <ProtectedRoute>
                <TrainingEditPage />
              </ProtectedRoute>
            }
          />
          {/* 
            Courses
              - courses
              - courses/:id/
              - courses/:id/edit 
          */}
          <Route
            path="courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/:courseId"
            element={
              <ProtectedRoute>
                <CourseDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/:courseId/edit"
            element={
              <ProtectedRoute>
                <CourseEditPage />
              </ProtectedRoute>
            }
          />
          {/* 
            Schedule 
              - schedule
          */}
          <Route
            path="schedule"
            element={
              <ProtectedRoute>
                <SchedulePage />
              </ProtectedRoute>
            }
          />

          {/* 
            Teachers 
              - Teachers      View the associates teachers for a student account.
          */}
          <Route
            path="teachers"
            element={
              <ProtectedRoute>
                <TeachersPages />
              </ProtectedRoute>
            }
          />
          <Route
            path="teachers/:teacherId"
            element={
              <ProtectedRoute>
                <TeacherDetailsPage />
              </ProtectedRoute>
            }
          />
          {/* 
            Students 
              - /Students      View the associates students for a teacher account.
          */}
          <Route
            path="students"
            element={
              <ProtectedRoute>
                <StudentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="students/:studentId"
            element={
              <ProtectedRoute>
                <StudentDetailsPage />
              </ProtectedRoute>
            }
          />
          {/* 
            Enrollments 
              - /enrollments      View the all the students enrollments.
          */}
          <Route
            path="enrollments"
            element={
              <ProtectedRoute>
                <EnrollmentsPage />
              </ProtectedRoute>
            }
          />
          {/* 
            Users 
              - Users      View the all the users for a teacher account.
          */}
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="users/:userId"
            element={
              <ProtectedRoute>
                <UserDetailsPage />
              </ProtectedRoute>
            }
          />
          {/* 
            Settings 
          */}
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          {/* 
            Profile 
          */}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          {/* 
            Admin 
          */}
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {/* 
        
          Alert Notifications use the store notification

      */}
      <AppNotification />
    </>
  );
}

export default App;

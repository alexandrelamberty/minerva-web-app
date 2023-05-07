import { Navigate, Route, Routes } from "react-router-dom";
import { AccountRecoveryForm } from "./components/account-recovery-form/account-recovery-form";
import Layout from "./containers/app-layout/layout";
import PublicLayout from "./containers/app-public-layout/public-layout";
import { LoginForm } from "./components/login-form.tsx/login-form";
import ProtectedRoute from "./components/protected-route/protected-route";
import { FormRegister } from "./components/register-form/register-form";
import { ResetPasswordForm } from "./components/reset-pasword-form/reset-password-form";
import AdminPage from "./pages/admin/admin.page";
import CoursesPage from "./pages/course/courses.page";
import DashboardPage from "./pages/dashboard/dashboard.page";
import ProfilePage from "./pages/profile/profile.page";
import SettingsPage from "./pages/settings/settings.page";
import TrainingsPage from "./pages/training/trainings.page";
import UsersPage from "./pages/users/users.page";
import TeachersPages from "./pages/teachers/teachers.page";
import StudentsPage from "./pages/students/students.page";
import SchedulePage from "./pages/schedule/schedule.page";

function App() {
  return (
    <Routes>
      {/* Application Auth Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/forgot-password" element={<AccountRecoveryForm />} />
      </Route>

      {/* Application Private Routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainings"
          element={
            <ProtectedRoute>
              <TrainingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <TeachersPages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <StudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

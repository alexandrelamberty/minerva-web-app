import { Navigate, Route, Routes } from "react-router-dom";
import { AccountRecoveryForm } from "./components/forms/account-recovery-form/account-recovery-form";
import Layout from "./containers/app-layout/layout";
import PublicLayout from "./containers/app-public-layout/public-layout";
import { LoginForm } from "./components/forms/login-form/login-form";
import ProtectedRoute from "./components/protected-route/protected-route";
import { FormRegister } from "./components/forms/register-form/register-form";
import { ResetPasswordForm } from "./components/forms/reset-pasword-form/reset-password-form";
import AdminPage from "./pages/admin/admin.page";
import CoursesPage from "./pages/course/courses.page";
import DashboardPage from "./pages/dashboard/dashboard.page";
import ProfilePage from "./pages/profile/profile.page";
import SettingsPage from "./pages/settings/settings.page";
import TrainingsPage from "./pages/trainings/trainings.page";
import UsersPage from "./pages/users/users.page";
import TeachersPages from "./pages/teachers/teachers.page";
import StudentsPage from "./pages/students/students.page";
import NotFoundPage from "./pages/not-found/not-found.page";
import TrainingsAddPage from "./pages/trainings/traingins-add.page";
import TrainingsEditPage from "./pages/trainings/traingins-edit.page";
import CategoriesPage from "./pages/categories/categories.page";
import { Alert } from "flowbite-react";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";

function App() {
  // const dispatch = useDispatch<AppDispatch>();

  const { show, errors } = useSelector(
    (state: RootState) => state.notification
  );

  return (
    <>
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
            path="categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="trainings"
            element={
              <ProtectedRoute>
                <TrainingsPage />
              </ProtectedRoute>
            }
          />
          <Route path="trainings/add" element={<TrainingsAddPage />} />
          <Route path="trainings/edit" element={<TrainingsEditPage />} />
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
                <h1>Schedule</h1>
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {/* 
        Notifications
      */}

      <Alert
        color="info"
        className={`${
          show ? "" : "hidden"
        }  absolute top-3 left-1/2 transform -translate-x-1/2 `}
      >
        <span>
          <span className="font-medium">Info alert!</span>Notification
        </span>
      </Alert>
    </>
  );
}

export default App;

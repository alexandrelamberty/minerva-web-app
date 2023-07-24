import { useEffect, useState } from "react";
import addNotification from "react-push-notification";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AccountRecoveryForm } from "./components/forms/account-recovery-form/account-recovery-form";
import { LoginForm } from "./components/forms/login-form/login-form";
import { FormRegister } from "./components/forms/register-form/register-form";
import DeleteModal from "./components/modals/delete-modal";
import AppLayout from "./containers/app-layout/app-layout";
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
import { socket } from "./services/ws-service";
import {
  acceptActionModalAction,
  declineActionModalAction,
} from "./store/actions/modals.actions";
import { notificationShowAction } from "./store/actions/notification.actions";
import { AppDispatch, RootState } from "./store/store";

/**
 * Socket.io
 */
const URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:8899"
    : "http://localhost:8899";

// export const socket = io(URL, {
//   autoConnect: false,
// });

function App() {
  // let socket: Socket;
  const dispatch = useDispatch<AppDispatch>();

  const {
    loggedInUser: user,
    loading,
    errors,
  } = useSelector((state: RootState) => state.auth);

  // Notification state
  const { type, title, message, time, show } = useSelector(
    (state: RootState) => state.notification
  );

  // Modals state
  const {
    show: showModal,
    title: titleModal,
    message: messageModal,
  } = useSelector((state: RootState) => state.modals);

  const [isConnected, setIsConnected] = useState(false);
  const [fooEvents, setFooEvents] = useState([]);

  function onConnect(socket) {
    console.log("> Connection", socket.id);
    setIsConnected(true);
  }

  function onDisconnect(socket) {
    console.log("> Disconnect");
    setIsConnected(false);
  }

  function onNotification(payload) {
    console.log("> Receive onNotification  : ", payload);
    // socket.emit("messaging:talk", "Connected" + socket.id);
    // FIXME: Maybe check focus ?
    /**
     * Show native notification
     */
    addNotification({
      title: "Warning",
      subtitle: "This is a subtitle",
      message: "This is a very long message",
      theme: "darkblue",
      native: true, // when using native, your OS will handle theming.
      duration: 5000,
      onClick: () => {
        console.log("Click native notification");
      },
    });

    /**
     * Show application notification
     */
    dispatch(
      notificationShowAction({
        type: "info",
        title: "User",
        message: "User connected!",
        time: new Date().toLocaleTimeString(),
      })
    );
  }

  function onYell(paylaad) {
    console.log(">>>>>>>>>>>>>> Yell");
  }

  useEffect(() => {
    if (user?.token) {
      if (!socket || !socket.connected) {
        socket.auth = {
          token: user.token,
        };
        socket.connect();
        socket.on("connect", () => onConnect(socket));
        socket.on("disconnect", onDisconnect);
        socket.on("notifications", onNotification);
        socket.on("messaging:connection", onYell);
      }
    }
    // socket.io.on("error", (error) => {});
    return () => {
      if (socket) {
        socket.off("connect", () => onConnect(socket));
        socket.off("disconnect", onDisconnect);
        socket.off("notifications", onNotification);
        socket.off("messaging:connection", onYell);
      }
    };
  }, [user]);

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
        <Route element={<AppLayout />}>
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
        Delete Modal 
      */}
      <DeleteModal
        show={showModal}
        onClose={() => {
          // dispatch modal close
          dispatch(declineActionModalAction());
        }}
        onConfirm={() => {
          dispatch(acceptActionModalAction());
        }}
        description={messageModal}
      />
    </>
  );
}

export default App;

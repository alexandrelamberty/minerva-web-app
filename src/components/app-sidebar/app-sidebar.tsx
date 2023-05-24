import { Sidebar } from "flowbite-react";
import {
  HiCalendar,
  HiChartPie,
  HiInbox,
  HiOutlinePrinter,
  HiUser,
  HiUsers,
  HiViewBoards,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserRole } from "../../enums/user-roles";
import { RootState } from "../../store/store";

export const AppSidebar = () => {
  // Retrieve logged in user to show the corresponding menu according to the
  // user role.
  const { loggedInUser } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Sidebar
        id="drawer-example"
        className="z-40 w-64 transition-transform -translate-x-full sm:translate-x-0 rounded-none"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiChartPie}>
              <Link to="/dashboard">Dashboard</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiViewBoards}>
              <Link to="/categories">Categories</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiViewBoards}>
              <Link to="/trainings">Trainings</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiInbox}>
              <Link to="/courses">Courses</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiCalendar}>
              <Link to="/schedule">Schedules</Link>
            </Sidebar.Item>
            {/* ONLY Admin and Student */}
            {(loggedInUser?.role === UserRole.Admin ||
              loggedInUser?.role === UserRole.Student) && (
              <Sidebar.Item icon={HiUser}>
                <Link to="/teachers">Teachers</Link>
              </Sidebar.Item>
            )}
            {/* ONLY Admin and Teacher */}
            {(loggedInUser?.role === UserRole.Admin ||
              loggedInUser?.role === UserRole.Teacher) && (
              <Sidebar.Item icon={HiUser}>
                <Link to="/students">Students</Link>
              </Sidebar.Item>
            )}
            {/* ONLY Admin */}
            {loggedInUser?.role === UserRole.Admin && (
              <>
                <Sidebar.Item icon={HiUsers}>
                  <Link to="/enrollments">Enrollments</Link>
                </Sidebar.Item>
                <Sidebar.Item icon={HiUser}>
                  <Link to="/users">Users</Link>
                </Sidebar.Item>
              </>
            )}
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiOutlinePrinter}>
              Help
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

import { DarkThemeToggle, Sidebar } from "flowbite-react";
import {
  HiCalendar,
  HiChartPie,
  HiInbox,
  HiOutlinePrinter,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { UserRole } from "../../enums/user-roles";

export const AppSidebar = () => {
  const { user, loading, errors } = useSelector(
    (state: RootState) => state.auth
  );
  return (
    <>
      <Sidebar
        id="drawer-example"
        aria-label="Sidebar with logo branding example"
        className="z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 rounded-none"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiChartPie}>
              <Link to="/dashboard">Dashboard</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiViewBoards}>
              <Link to="/trainings">Trainings</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiInbox}>
              <Link to="/courses">Courses</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiCalendar}>
              <Link to="/schedule">Schedule</Link>
            </Sidebar.Item>
            {/* if user is Admin */}
            {user?.role === UserRole.Admin && (
              <Sidebar.Item icon={HiUser}>
                <Link to="/users">Users</Link>
              </Sidebar.Item>
            )}
            {/* If User is Student */}
            {user?.role === UserRole.Student && (
              <Sidebar.Item icon={HiUser}>
                <Link to="/teachers">Teachers</Link>
              </Sidebar.Item>
            )}
            {/* If User is Teacher */}
            {user?.role === UserRole.Teacher && (
              <Sidebar.Item icon={HiUser}>
                <Link to="/students">Students</Link>
              </Sidebar.Item>
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

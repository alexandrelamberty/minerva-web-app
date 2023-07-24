import { Sidebar } from "flowbite-react";
import {
  HiCalendar,
  HiChartPie,
  HiIdentification,
  HiInbox,
  HiOutlinePrinter,
  HiUserGroup,
  HiViewBoards,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserRole } from "../../enums/user-roles";
import { RootState } from "../../store/store";

// TODO:
const menu = [
  {
    title: "Dashboard",
    role: "teacher",
    path: "/dashboard",
  },
];
/**
 * Application Sidebar
 * @returns
 */
export const AppSidebar = () => {
  // Retrieve logged in user to show the corresponding menu according to the
  // user role.
  const { loggedInUser } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Sidebar
        id="app-sidebar"
        data-test-id="app-sidebar"
        className="z-40 w-64 transition-transform -translate-x-full sm:translate-x-0 rounded-none "
      >
        <Sidebar.Items>
          <div className="">
            {/* Student */}
            {loggedInUser?.role === UserRole.Student && (
              <div data-testid="students">
                <Sidebar.ItemGroup>
                  <Sidebar.Item icon={HiChartPie}>
                    <Link to="/dashboard">Dashboard</Link>
                  </Sidebar.Item>{" "}
                  <Sidebar.Item icon={HiViewBoards}>
                    <Link to="/catalog">Training Catalog</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiViewBoards}>
                    <Link to="/sessions">My Sessions</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiUserGroup}>
                    <Link to="/enrollments">Trainers</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiCalendar}>
                    <Link to="/schedule">Schedules</Link>
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </div>
            )}
            {/* Teachers */}
            {loggedInUser?.role === UserRole.Teacher && (
              <div data-testid="teachers">
                <Sidebar.ItemGroup>
                  <Sidebar.Item icon={HiChartPie}>
                    <Link to="/dashboard">Dashboard</Link>
                  </Sidebar.Item>{" "}
                  <Sidebar.Item icon={HiViewBoards}>
                    <Link to="/catalog">Training Catalog</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiViewBoards}>
                    <Link to="/sessions">My Sessions</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiUserGroup}>
                    <Link to="/enrollments">Trainers</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiCalendar}>
                    <Link to="/schedule">Schedules</Link>
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </div>
            )}
            {/*Admin */}
            {loggedInUser?.role === UserRole.Admin && (
              <div data-testid="admins">
                <Sidebar.ItemGroup>
                  <Sidebar.Item icon={HiChartPie}>
                    <Link to="/dashboard">Dashboard</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiViewBoards}>
                    <Link to="/sessions">Training Sessions</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiUserGroup}>
                    <Link to="/enrollments">Enrollments</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiCalendar}>
                    <Link to="/schedule">Schedules</Link>
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
                  <Sidebar.Item icon={HiIdentification}>
                    <Link to="/teachers">Teachers</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiIdentification}>
                    <Link to="/students">Students</Link>
                  </Sidebar.Item>
                  <Sidebar.Item icon={HiUserGroup}>
                    <Link to="/users">Users</Link>
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </div>
            )}
          </div>
          <div data-testid="footer">
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiOutlinePrinter}>
                Help
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </div>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

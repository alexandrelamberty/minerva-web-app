import { Outlet } from "react-router-dom";
import { AppBreadcrumb } from "../../components/app-breadcrumb/app-breadcrumb";
import { AppHeader } from "../../components/app-header/app-header";
import { AppSidebar } from "../../components/app-sidebar/app-sidebar";

/**
 * The application layout.is used for the private routes.
 *
 * @returns
 */
const AppLayout = () => {
  return (
    <div className="min-h-screen dark:bg-gray-800">
      <AppHeader />
      <div className="flex flex-row h-full">
        {/* <SidebarNav /> */}
        <AppSidebar />
        <div className="flex-1">
          <AppBreadcrumb />
          <div className="p-4 space-y-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

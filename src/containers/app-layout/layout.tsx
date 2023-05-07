import { Outlet } from "react-router-dom";
import SidebarNav from "../../components/app-sidebar/sidebar";
import { AppSidebar } from "../../components/app-sidebar/app-sidebar";
import { AppHeader } from "../../components/app-header/app-header";
import { AppBreadcrumb } from "../../components/app-breadcrumb/app-breadcrumb";

const Layout = () => {
  return (
    <div className="min-h-screen">
      {/* <SidebarNav /> */}
      <AppHeader />
      <div className="flex flex-row h-full">
        <AppSidebar />
        <div className="flex-1">
          <AppBreadcrumb />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

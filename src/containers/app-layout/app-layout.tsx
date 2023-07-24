import { Outlet } from "react-router-dom";
import { AppBreadcrumb } from "../../components/app-breadcrumb/app-breadcrumb";
import AppFooter from "../../components/app-footer/app-footer";
import { AppHeader } from "../../components/app-header/app-header";
import AppNotification from "../../components/app-notification/app-notification";
import { AppSidebar } from "../../components/app-sidebar/app-sidebar";
import Chat from "../../components/chat/chat";

/**
 * The application layout is used for the private routes.
 *
 * @returns
 */
const AppLayout = () => {
  return (
    <div className="min-h-screen max-h-screen dark:bg-gray-800">
      <AppHeader />
      <main className="flex min-h-screen">
        <AppSidebar />
        <section className="flex flex-col w-full">
          <AppBreadcrumb />
          <div className="p-8 h-full overflow-y-scroll overflow-scroll">
            <Outlet />
          </div>
        </section>
      </main>
      <AppFooter />
      {/*  Sticky footer */}
      {/* FIXME: Alerts, modals, notifications, and others.*/}
      {/* 
        Application General Chat 
      */}
      <div className="sticky bottom-28 flex w-full pr-10 justify-end ">
        <div className="w-128 h-128">
          <Chat className="h-full" />
        </div>
      </div>
      <div className="sticky bottom-10 flex w-full pr-10 justify-end">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Chat
        </button>
      </div>

      {/* 
        Alert Notifications use the store notification
      */}
      <AppNotification />
    </div>
  );
};

export default AppLayout;

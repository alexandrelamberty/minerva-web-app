import {
  Avatar,
  Badge,
  DarkThemeToggle,
  Dropdown,
  useThemeMode,
} from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authLogoutAction } from "../../store/actions/auth.actions";
import { AppDispatch, RootState } from "../../store/store";

type AppBrandProps = {
  label: string;
  url: string;
  image: string;
};

const AppBrand = ({ label, url, image }: AppBrandProps) => {
  return (
    <Link
      to={url}
      className="flex mr-8 self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
    >
      <img src={image} className="mr-3 h-8" alt="FlowBite Logo" />
      {label}
    </Link>
  );
};

const SearchForm = () => {
  return (
    <form action="#" method="GET" className="hidden lg:block lg:pl-2">
      <label htmlFor="topbar-search" className="sr-only">
        Search
      </label>
      <div className="relative mt-1 lg:w-96">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          name="email"
          id="topbar-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Search"
        />
      </div>
    </form>
  );
};

const UserDropdownMenuItems = [
  {
    label: "Profile",
    url: "/profile",
  },
  {
    label: "Settings",
    url: "/settings",
  },
];

type UserDropdownMenuItem = {
  label: string;
  url: string;
};

type UserDropdownMenuProps = {
  items: UserDropdownMenuItem[];
};

const UserDropdownMenu = ({ items }: UserDropdownMenuProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // FIXME: Move outside component?
  const {
    loggedInUser: user,
    loading,
    errors,
  } = useSelector((state: RootState) => state.auth);

  const handleClick = (item: UserDropdownMenuItem) => {
    navigate(item.url);
  };

  const handleOnSignOut = () => {
    dispatch(authLogoutAction());
  };

  return (
    <Dropdown
      label={<Avatar alt="User settings" img={user?.avatar} rounded={true} />}
      arrowIcon={false}
      inline={true}
    >
      <Dropdown.Header>
        <span className="block text-sm">
          {user?.firstName} {user?.lastName}
        </span>
        <span className="block truncate text-sm font-medium">
          {user?.email}
        </span>
      </Dropdown.Header>
      {items.map((item) => (
        <Dropdown.Item key={item.url} onClick={() => handleClick(item)}>
          {item.label}
        </Dropdown.Item>
      ))}
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleOnSignOut}>Sign out</Dropdown.Item>
    </Dropdown>
  );
};

export const AppHeader = () => {
  const [mode, setMode, toggleMode] = useThemeMode();

  const {
    loggedInUser: user,
    loading,
    errors,
  } = useSelector((state: RootState) => state.auth);

  const handleThemeToggle = () => {
    toggleMode();
  };

  useEffect(() => {
    console.log("Theme mode: ", mode);
  }, []);

  useEffect(() => {
    console.log("Theme mode watch: ", mode);
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        setMode("light");
      } else {
        setMode("dark");
      }
    } else {
      localStorage.setItem("color-theme", mode);
    }
  }, [mode]);

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            {/*  */}
            <button
              id="toggleSidebar"
              aria-expanded="true"
              aria-controls="sidebar"
              className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {/*  */}
            <button
              aria-expanded="true"
              aria-controls="sidebar"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                aria-hidden="true"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <AppBrand label="Minerva" url="/dashboard" image="logo.svg" />
            <SearchForm />
          </div>
          <div className="flex items-center lg:order-2 space-x-2">
            <DarkThemeToggle onClick={handleThemeToggle} />
            <Badge>{user?.role}</Badge>
            <UserDropdownMenu items={UserDropdownMenuItems} />
          </div>
        </div>
      </nav>
    </header>
  );
};

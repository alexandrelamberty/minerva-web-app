import { Avatar, Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { authLogoutAction } from "../../store/actions/auth.actions";
import { AppDispatch, RootState } from "../../store/store";

type UserDropdownMenuItem = {
  label: string;
  url: string;
};

type UserDropdownMenuProps = {
  items?: UserDropdownMenuItem[];
};

/**
 * User Dropdown show a menu for the users connected to the system.
 * It display the user name, email, and a 'Sign-out' item. It also show custom items if provided.
 * This component is connected to the application state (store).
 * @param param0
 * @returns
 */
const UserDropdownMenu = ({ items }: UserDropdownMenuProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  const { sendJsonMessage } = useWebSocket(import.meta.env.VITE_WS_URL, {
    share: true,
    filter: () => false,
  });

  const handleClick = (item: UserDropdownMenuItem) => {
    navigate(item.url);
  };

  const handleOnSignOut = () => {
    //
    sendJsonMessage({
      type: "USER_LOGOUT",
      content: {
        userId: loggedInUser?.id,
      },
    });
    dispatch(authLogoutAction());
  };

  return (
    <Dropdown
      label={
        <Avatar alt="User settings" img={loggedInUser?.avatar} rounded={true} />
      }
      arrowIcon={false}
      inline={true}
    >
      <Dropdown.Header>
        <span className="block text-sm" data-testid="name">
          {loggedInUser?.firstName} {loggedInUser?.lastName}
        </span>
        <span
          className="block truncate text-sm font-medium"
          data-testid="email"
        >
          {loggedInUser?.email}
        </span>
      </Dropdown.Header>
      {items &&
        items.map((item) => (
          <Dropdown.Item key={item.url} onClick={() => handleClick(item)}>
            {item.label}
          </Dropdown.Item>
        ))}
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleOnSignOut}>Sign out</Dropdown.Item>
    </Dropdown>
  );
};

export default UserDropdownMenu;

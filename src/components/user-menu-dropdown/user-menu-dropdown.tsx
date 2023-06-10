import { Avatar, Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogoutAction } from "../../store/actions/auth.actions";
import { AppDispatch, RootState } from "../../store/store";

/**
 * UserDropdownMenu
 * @param param0
 * @returns
 */
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

export default UserDropdownMenu;

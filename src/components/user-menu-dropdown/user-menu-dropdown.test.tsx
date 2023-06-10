import { describe } from "vitest";
import { LoggedInUser } from "../../models/user.model";
import { renderWithProviders } from "../../utils/tests";
import UserDropdownMenu from "./user-menu-dropdown";

describe("UserMenuDropdown test", () => {
  test("should display auth state user email", () => {
    const loggedInUser: LoggedInUser = {
      id: "1",
      username: "jodo",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "admin",
      avatar: "string",
      token: "string",
    };

    const initialAuth = {
      loggedInUser: loggedInUser,
      loading: false,
      status: "idle",
      errors: null,
    };
    const items = [
      {
        label: "Profile",
        url: "/profile",
      },
      {
        label: "Settings",
        url: "/settings",
      },
    ];
    const { getByText } = renderWithProviders(
      <UserDropdownMenu items={items} />,
      {
        preloadedState: {
          auth: initialAuth,
        },
      }
    );
    const userEmail = getByText("john.doe@example.com");
    // expect(screen.getByText(/john.doe@example.com/i)).toBeDefined();
  });
});

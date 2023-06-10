import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LoggedInUser } from "../../models/user.model";
import { renderWithProviders } from "../../utils/tests";
import { AppSidebar } from "./app-sidebar";

/**
 * Test the presence oh HTML elements and state data.
 */
describe("AppSidebar test", () => {
  test("should display state form admin user", () => {
    const loggedInUser: LoggedInUser = {
      id: "1",
      username: "eevos",
      email: "string",
      firstName: "string",
      lastName: "string",
      role: "admin",
      avatar: "string",
      token: "string",
    };
    const initialAuth = {
      loggedInUser: loggedInUser,
      loading: false,
      status: "pending",
      errors: null,
    };
    const { getByText } = renderWithProviders(<AppSidebar />, {
      preloadedState: {
        auth: initialAuth,
      },
    });
    expect(screen.getByTestId("admin")).toBeDefined();
  });

  test("should display state form admin user", () => {
    const loggedInUser: LoggedInUser = {
      id: "1",
      username: "eevos",
      email: "string",
      firstName: "string",
      lastName: "string",
      role: "admin",
      avatar: "string",
      token: "string",
    };
    const initialAuth = {
      loggedInUser: loggedInUser,
      loading: false,
      status: "pending",
      errors: null,
    };
    const { getByTestId } = renderWithProviders(<AppSidebar />, {
      preloadedState: {
        auth: initialAuth,
      },
    });

    expect(getByTestId("admin")).toBeDefined();
  });
});

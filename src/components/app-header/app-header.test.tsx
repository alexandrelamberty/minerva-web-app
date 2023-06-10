import { describe, test } from "vitest";
import { renderWithProviders } from "../../utils/tests";
import { AppHeader } from "./app-header";

describe("AppHeader test", () => {
  test("should display auth state user role", () => {
    const initialAuth = {
      loggedInUser: {
        id: "1",
        username: "eevos",
        email: "string",
        firstName: "string",
        lastName: "string",
        role: "admin",
        avatar: "string",
        token: "string",
      },
      loading: false,
      status: "pending",
      errors: null,
    };
    const { getByText } = renderWithProviders(<AppHeader />, {
      preloadedState: {
        auth: initialAuth,
      },
    });
    expect(getByText("admin")).toBeDefined();
  });
});

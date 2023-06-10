import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { renderWithProviders } from "../../utils/tests";
import AppNotification from "./app-notification";

/**
 * Test the presence oh HTML elements and state data.
 */
describe("AppNotification test", () => {
  const initialNotification = {
    show: true,
    type: "info",
    title: "Title",
    message: "Message",
    time: 3000,
  };

  test("title should be present", () => {
    renderWithProviders(<AppNotification />);
    expect(screen.getByTestId("title")).toBeTruthy();
  });

  test("message should be present", () => {
    renderWithProviders(<AppNotification />);
    expect(screen.getByTestId("message")).toBeTruthy();
  });

  test("should display state info data", () => {
    const { getByText } = renderWithProviders(<AppNotification />, {
      preloadedState: {
        notification: initialNotification,
      },
    });
    expect(getByText(/info/i)).toBeDefined();
  });

  test("should display state message data", () => {
    const { getByText } = renderWithProviders(<AppNotification />, {
      preloadedState: {
        notification: initialNotification,
      },
    });
    expect(getByText(/Title/i)).toBeDefined();
  });

  test("should display state title data", () => {
    const { getByText } = renderWithProviders(<AppNotification />, {
      preloadedState: {
        notification: initialNotification,
      },
    });
    expect(getByText(/Title/i)).toBeDefined();
  });
});

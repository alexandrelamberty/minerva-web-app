import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import { AppHeader } from "./app-header";

describe("AppHeader test", () => {
  beforeEach(() => {
    render(<AppHeader />);
  });

  // test("the title element should be present", () => {
  //   expect(screen.getByTestId("title")).toBeTruthy();
  // });

  test("the message element should be present", () => {
    expect(screen.getByTestId("message")).toBeTruthy();
  });

  // test("should show the title", () => {
  //   expect(screen.getByText(/Title/i)).toBeDefined();
  // });

  test("should show the message", () => {
    expect(screen.getByText(/Message/i)).toBeDefined();
  });
});

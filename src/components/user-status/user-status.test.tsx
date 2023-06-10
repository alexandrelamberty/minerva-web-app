import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import UserStatus from "./user-status";

/**
 * Test the presence of HTML element and that props are correctly passed.
 */
describe("UserStatus test", () => {
  beforeEach(() => {
    render(<UserStatus status="Status" />);
  });

  test("Component should be present", () => {
    expect(screen.getByTestId("status")).toBeTruthy();
  });

  test("Should display the status", () => {
    expect(screen.getByText(/Status/i)).toBeDefined();
  });
});

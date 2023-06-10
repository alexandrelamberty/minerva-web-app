import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import AppNotification from "./app-notification";

describe("AppNotification test", () => {
  beforeEach(() => {
    render(<AppNotification />);
  });

  test("message should be present", () => {
    expect(screen.getByTestId("message")).toBeTruthy();
  });
});

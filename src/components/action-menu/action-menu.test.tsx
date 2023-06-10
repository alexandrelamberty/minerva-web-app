import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { ActionMenu } from "./action-menu";

describe("ActionMenu test", () => {
  beforeEach(() => {
    render(
      <ActionMenu title="Testing">
        <button>Content</button>
        <button>More</button>
      </ActionMenu>
    );
  });

  test("should the title h1 be present", () => {
    expect(screen.getByTestId("title")).toBeTruthy();
  });

  test("should show the title", () => {
    expect(screen.getByText(/Testing/i)).toBeDefined();
  });

  test("should show a single children", () => {
    expect(screen.getByText(/Content/i)).toBeDefined();
  });

  test("should show a multiple children", () => {
    expect(screen.getByText(/Content/i)).toBeDefined();
    expect(screen.getByText(/More/i)).toBeDefined();
  });
});

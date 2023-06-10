import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import MaterialListItem from "./material-list-item";

/**
 * Test the presence of HTML element and that props are correctly passed.
 */
describe("MaterialListItem test", () => {
  beforeEach(() => {
    // FIXME:
    const material = {
      id: "1",
      name: "Name",
      description: "Description",
      file: "Cover",
      type: "document",
    };
    render(<MaterialListItem material={material} />);
  });

  test("The name paragraph should be present", () => {
    expect(screen.getByTestId("name")).toBeTruthy();
  });

  test("should display the description ", () => {
    expect(screen.getByText(/Name/i)).toBeDefined();
  });
});

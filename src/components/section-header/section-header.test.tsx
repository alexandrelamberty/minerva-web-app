import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SectionHeader from "./section-header";

describe("SectionHeader test", () => {
  beforeEach(() => {
    render(<SectionHeader title="Title" />);
  });

  test("The title element should be present", () => {
    expect(screen.getByTestId("title")).toBeTruthy();
  });

  test("should show the title", () => {
    expect(screen.getByText(/Title/i)).toBeDefined();
  });
});

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { UserRole } from "../../enums/user-roles";
import TrainingListItem from "./training-list-item";

/**
 * Test the presence of HTML element and that props are correctly passed.
 */
describe("TrainingListItem test", () => {
  beforeEach(() => {
    // FIXME:
    const training = {
      id: "1",
      name: "Name",
      description: "Description",
      cover: "Cover",
      startDate: new Date().toDateString(),
      endDate: new Date().toDateString(),
      duration: 120,
      category: {
        id: "1",
        name: "Category",
      },
      teacher: {
        id: "1",
        company: "company",
        user: {
          id: "1",
          name: "John Doe",
          firstName: "John",
          lastName: "Doe",
          role: UserRole.Admin,
          avatar: "",
          email: "john.doe@mail.com",
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
        },
        courses: [],
      },
    };
    render(<TrainingListItem training={training} />);
  });

  test("should the list-item be present", () => {
    expect(screen.getByTestId("training-list-item")).toBeTruthy();
  });

  test("should the image be present", () => {
    expect(screen.getByTestId("cover")).toBeTruthy();
  });

  test("should the name paragraph be present", () => {
    expect(screen.getByTestId("name")).toBeTruthy();
  });

  test("should the description paragraph be present", () => {
    expect(screen.getByTestId("description")).toBeTruthy();
  });

  test("should display the name", () => {
    expect(screen.getByText(/Name/i)).toBeDefined();
  });

  test("should display the description ", () => {
    expect(screen.getByText(/Description/i)).toBeDefined();
  });

  // TODO: test image
});

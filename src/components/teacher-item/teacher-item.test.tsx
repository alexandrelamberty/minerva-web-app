import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { UserRole } from "../../enums/user-roles";
import TeacherItem from "./teacher-item";

/**
 * Test the presence of HTML element and that props are correctly passed.
 */
describe("TeacherItem test", () => {
  beforeEach(() => {
    const teacher = {
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
    };
    render(<TeacherItem teacher={teacher} />);
  });

  test("should the avatar be present", () => {
    expect(screen.getByTestId("avatar")).toBeTruthy();
  });

  test("should the name paragraph be present", () => {
    expect(screen.getByTestId("name")).toBeTruthy();
  });

  // TODO: to be implemented
  // test("should display the avatar of teacher", () => {
  //   expect(true).toBe(false);
  // });

  test("should display the name of the teacher ", () => {
    expect(screen.getByText(/John Doe/i)).toBeDefined();
  });
});

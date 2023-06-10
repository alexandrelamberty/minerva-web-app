import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AppAlert from "./app-alert";

describe("AppAlert test", () => {
  // test("renders AppAlert component with the correct message", () => {
  //   const message = "This is a test message";
  //   const { getByTestId } = render(
  //     <AppAlert title="Test Title" message={message} />
  //   );
  //   const messageElement = getByTestId("message");
  //   expect(messageElement).toBeInTheDocument();
  //   expect(messageElement).toHaveTextContent(message);
  // });

  // test("the title element should be present", () => {
  //   expect(screen.getByTestId("title")).toBeTruthy();
  // });

  test("the message element should be present", () => {
    render(<AppAlert title="Title" message="Message" />);
    expect(screen.getByTestId("message")).toBeTruthy();
  });

  // test("should show the title", () => {
  //   expect(screen.getByText(/Title/i)).toBeDefined();
  // });

  test("should show the message", () => {
    render(<AppAlert title="Title" message="Message" />);
    expect(screen.getByText(/Message/i)).toBeDefined();
  });
});

import { render, screen } from "@testing-library/react";
import Greet from ".";

test("renders learn react link", () => {
  render(<Greet />);
  const linkElement = screen.getByText(/Hello/i);
  expect(linkElement).toBeInTheDocument();
});
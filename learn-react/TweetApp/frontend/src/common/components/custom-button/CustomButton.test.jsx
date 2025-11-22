import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomButton from "./CustomButton";

jest.mock("../icon-component/IconComponent", () => {
  function MockIcon({ iconName }) {
    return <span data-testid={`icon-${iconName}`} />;
  }
  return MockIcon;
});

describe("CustomButton", () => {
  it("renders children and calls onClick", async () => {
    const onClick = jest.fn();
    render(<CustomButton onClick={onClick}>Save</CustomButton>);

    await userEvent.click(screen.getByRole("button", { name: /save/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders icon when iconName is set", () => {
    render(
      <CustomButton iconName="FaSave" onClick={() => {}}>
        Go
      </CustomButton>
    );
    expect(screen.getByTestId("icon-FaSave")).toBeInTheDocument();
  });

  it("sets title attribute and respects disabled", async () => {
    const onClick = jest.fn();
    render(
      <CustomButton title="Hint" onClick={onClick} disabled>
        X
      </CustomButton>
    );

    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("title", "Hint");
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});

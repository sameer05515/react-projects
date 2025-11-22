import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomCheckbox from "./CustomCheckbox";

describe("CustomCheckbox", () => {
  it("reflects initiallySelected and toggles with onChange", async () => {
    const onChange = jest.fn();
    render(
      <CustomCheckbox title="Accept terms" onChange={onChange} initiallySelected />
    );

    const box = screen.getByRole("checkbox", { name: /accept terms/i });
    expect(box).toBeChecked();

    await userEvent.click(box);
    expect(box).not.toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(false);

    await userEvent.click(box);
    expect(box).toBeChecked();
    expect(onChange).toHaveBeenLastCalledWith(true);
  });

  it("starts unchecked when initiallySelected is false", () => {
    render(
      <CustomCheckbox title="Opt in" onChange={() => {}} initiallySelected={false} />
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });
});

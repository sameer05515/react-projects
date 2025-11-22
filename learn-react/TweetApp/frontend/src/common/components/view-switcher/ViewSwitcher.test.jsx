import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ViewSwitcher from "./ViewSwitcher";

describe("ViewSwitcher", () => {
  const viewList = [
    { viewName: "list", viewLabel: "List View" },
    { viewName: "card", viewLabel: "Card View" },
  ];

  it("renders radio options and children", () => {
    render(
      <ViewSwitcher
        viewList={viewList}
        selectedView="list"
        onChange={() => {}}
      >
        <div data-testid="child">content</div>
      </ViewSwitcher>
    );

    expect(screen.getByLabelText("List View")).toBeChecked();
    expect(screen.getByLabelText("Card View")).not.toBeChecked();
    expect(screen.getByTestId("child")).toHaveTextContent("content");
  });

  it("invokes onChange when selecting another view", async () => {
    const onChange = jest.fn();
    render(
      <ViewSwitcher
        viewList={viewList}
        selectedView="list"
        onChange={onChange}
      />
    );

    await userEvent.click(screen.getByLabelText("Card View"));
    expect(onChange).toHaveBeenCalled();
  });
});

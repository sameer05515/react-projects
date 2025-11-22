import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useGlobalServiceProvider from "./useGlobalServiceProvider";

function Probe() {
  const { getNameVal, getNameValComponent, setNameVal } =
    useGlobalServiceProvider();

  return (
    <div>
      <div data-testid="name">{getNameVal() ?? ""}</div>
      <div data-testid="name-component">{getNameValComponent}</div>
      <button type="button" onClick={() => setNameVal("Alice")}>
        Set
      </button>
    </div>
  );
}

describe("common/hooks/useGlobalServiceProvider", () => {
  it("exposes name value and lets consumers update it", () => {
    render(<Probe />);

    // Initially name is undefined.
    expect(screen.getByTestId("name").textContent).toBe("");

    fireEvent.click(screen.getByRole("button", { name: /Set/i }));
    expect(screen.getByTestId("name")).toHaveTextContent("Alice");
    expect(screen.getByTestId("name-component")).toHaveTextContent("Alice");
  });
});


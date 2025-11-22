import React from "react";
import { render, screen } from "@testing-library/react";

import DynamicDataRenderer from "./DynamicDataRenderer";

describe("common/components/dynamic-data-renderer/DynamicDataRenderer", () => {
  it("renders primitive values", () => {
    render(<DynamicDataRenderer data={{ a: "x", b: 2, c: true }} />);

    expect(screen.getByText(/a:/i)).toBeInTheDocument();
    expect(screen.getByText("x")).toBeInTheDocument();
    expect(screen.getByText(/b:/i)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText(/c:/i)).toBeInTheDocument();
    expect(screen.getByText("true")).toBeInTheDocument();
  });

  it("renders null as the string \"null\"", () => {
    render(<DynamicDataRenderer data={null} />);
    expect(screen.getByText("null")).toBeInTheDocument();
  });

  it("renders arrays and objects recursively", () => {
    render(
      <DynamicDataRenderer
        data={{
          arr: ["a", 1],
          obj: { nested: false },
        }}
      />
    );

    expect(screen.getByText(/arr:/i)).toBeInTheDocument();
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText(/obj:/i)).toBeInTheDocument();
    expect(screen.getByText(/nested:/i)).toBeInTheDocument();
    expect(screen.getByText("false")).toBeInTheDocument();
  });
});


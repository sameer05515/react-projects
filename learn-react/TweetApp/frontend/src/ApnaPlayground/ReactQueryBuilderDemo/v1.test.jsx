import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

// Stub QueryBuilder to avoid heavy runtime and isolate our demo wrapper.
jest.mock("react-querybuilder", () => {
  const React = require("react");
  return {
    __esModule: true,
    QueryBuilder: ({ query, onQueryChange }) => (
      <div>
        <pre data-testid="query-json">{JSON.stringify(query)}</pre>
        <button
          type="button"
          onClick={() =>
            onQueryChange?.({
              ...query,
              rules: [
                { ...query.rules[0], value: 25 },
                ...query.rules.slice(1),
              ],
            })
          }
        >
          Update
        </button>
      </div>
    ),
  };
});

jest.mock("@react-querybuilder/material", () => ({
  materialControlElements: {},
}));

import ReactQueryBuilderDemoV1 from "./v1";

describe("ReactQueryBuilderDemoV1", () => {
  it("renders heading and shows generated query JSON", () => {
    render(<ReactQueryBuilderDemoV1 />);

    expect(
      screen.getByRole("heading", {
        name: /React Query Builder with Material UI/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/Generated Query:/i)).toBeInTheDocument();
    expect(screen.getByTestId("query-json").textContent).toContain('"age"');
  });

  it("updates query when QueryBuilder triggers onQueryChange", () => {
    render(<ReactQueryBuilderDemoV1 />);

    fireEvent.click(screen.getByText(/Update/i));
    expect(screen.getByTestId("query-json").textContent).toContain(
      '"value":25'
    );
  });
});


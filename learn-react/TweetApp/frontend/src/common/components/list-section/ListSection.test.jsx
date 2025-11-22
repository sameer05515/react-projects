import React from "react";
import { render, screen } from "@testing-library/react";

import ListSection from "./ListSection";

describe("common/components/list-section/ListSection", () => {
  it("renders title and items when items is a non-empty array", () => {
    const renderItem = (item) => <div>Item {item}</div>;

    render(
      <ListSection
        title="My List"
        items={[1, 2]}
        renderItem={renderItem}
        errorMessage="No items"
      />
    );

    expect(screen.getByText("My List")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders errorMessage when items is null/empty", () => {
    const renderItem = () => null;

    render(
      <ListSection
        title="My List"
        items={null}
        renderItem={renderItem}
        errorMessage="No items"
      />
    );

    expect(screen.getByText("My List")).toBeInTheDocument();
    expect(screen.getByText("No items")).toBeInTheDocument();
  });
});


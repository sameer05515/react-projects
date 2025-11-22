import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import RatingComponent from "./RatingComponent";

describe("common/components/rating-component/RatingComponent", () => {
  it("shows rating text and calls onEdit with selected value when editable", () => {
    const onEdit = jest.fn();
    const { container } = render(
      <RatingComponent
        rating={2}
        ratingScale={5}
        editable={true}
        onEdit={onEdit}
      />
    );

    expect(screen.getByText("2/5")).toBeInTheDocument();

    // Each star wrapper span is clickable when editable; pick star #3 (index 2).
    const clickableSpans = container.querySelectorAll("span.cursor-pointer");
    expect(clickableSpans.length).toBeGreaterThanOrEqual(3);

    fireEvent.click(clickableSpans[2]);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(3);
  });

  it("does not call onEdit when editable is false", () => {
    const onEdit = jest.fn();
    const { container } = render(
      <RatingComponent
        rating={2}
        ratingScale={5}
        editable={false}
        onEdit={onEdit}
      />
    );

    const clickableSpans = container.querySelectorAll("span.cursor-pointer");
    expect(clickableSpans.length).toBe(0);

    // Still, attempt clicking any star wrapper.
    fireEvent.click(container.querySelectorAll("span")[0]);
    expect(onEdit).not.toHaveBeenCalled();
  });
});


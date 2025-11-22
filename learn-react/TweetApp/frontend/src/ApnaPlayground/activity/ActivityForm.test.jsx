import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import ActivityForm from "./ActivityForm";

describe("ApnaPlayground/activity/ActivityForm", () => {
  it("saves an activity and opens edit form", () => {
    render(<ActivityForm />);

    const activityNameInput = document.querySelector('#activityName');
    expect(activityNameInput).toBeInTheDocument();

    fireEvent.change(activityNameInput, { target: { value: "My Activity" } });

    // Select two groups (role-based to avoid matching saved-text cells)
    const shareerCheckbox = screen.getAllByRole("checkbox", { name: /shareer/i })[0];
    const ajeevikaCheckbox = screen.getAllByRole("checkbox", { name: /ajeevika/i })[0];
    fireEvent.click(shareerCheckbox);
    fireEvent.click(ajeevikaCheckbox);

    // Submit
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    // Saved data table should appear
    expect(screen.getByText(/Saved Data/i)).toBeInTheDocument();
    expect(screen.getByText("My Activity")).toBeInTheDocument();
    expect(screen.getByText(/shareer,\s*ajeevika/i)).toBeInTheDocument();

    // Click edit (do not submit edit form to avoid nested-form side effects)
    fireEvent.click(screen.getByRole("button", { name: /Edit/i }));
    const editInput = document.querySelector("#editActivityName");
    expect(editInput).toBeInTheDocument();
    expect(editInput).toHaveValue("My Activity");
  });
});


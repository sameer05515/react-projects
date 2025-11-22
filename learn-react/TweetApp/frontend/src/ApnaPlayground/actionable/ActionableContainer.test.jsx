import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("uuid", () => ({
  __esModule: true,
  v4: () => "uuid-1",
}));

jest.mock("../../common/service/commonService", () => ({
  __esModule: true,
  formatDateToDDMMMYYYYWithTime: (d) => `formatted:${d}`,
}));

import ActionableForm from "./ActionableForm";
import ActionableList from "./ActionableList";

describe("Actionable", () => {
  it("submits form data and calls postSaveAction with a generated id", () => {
    const mockPostSaveAction = jest.fn();

    render(
      <ActionableForm
        postSaveAction={mockPostSaveAction}
        initialData={{
          activityName: "",
          activityDescription: "",
          recurrence: "OneTime",
          shouldContinue: "yes",
          startDate: "",
          endDate: "",
        }}
      />
    );

    const nameInput = document.querySelector('input[name="activityName"]');
    const descInput = document.querySelector(
      'textarea[name="activityDescription"]'
    );
    const recurrenceSelect = document.querySelector('select[name="recurrence"]');
    const noRadio = document.querySelector(
      'input[name="shouldContinue"][value="no"]'
    );
    const startDateInput = document.querySelector('input[name="startDate"]');
    const endDateInput = document.querySelector('input[name="endDate"]');

    fireEvent.change(nameInput, { target: { value: "New Activity" } });
    fireEvent.change(descInput, {
      target: { value: "Some description" },
    });
    fireEvent.change(recurrenceSelect, { target: { value: "Daily" } });
    fireEvent.click(noRadio);
    fireEvent.change(startDateInput, { target: { value: "2024-02-01" } });
    fireEvent.change(endDateInput, { target: { value: "2024-02-02" } });

    fireEvent.click(screen.getByRole("button", { name: /Save Activity/i }));

    expect(mockPostSaveAction).toHaveBeenCalledTimes(1);
    expect(mockPostSaveAction.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        id: "uuid-1",
        activityName: "New Activity",
        recurrence: "Daily",
        shouldContinue: "no",
        startDate: "2024-02-01",
        endDate: "2024-02-02",
      })
    );
  });

  it("renders activities with formatted dates", () => {
    render(
      <ActionableList
        activities={[
          {
            id: "a1",
            activityName: "Seed Activity",
            recurrence: "OneTime",
            shouldContinue: "yes",
            startDate: "2024-01-01",
            endDate: "2024-01-02",
          },
        ]}
      />
    );

    expect(screen.getByText("Seed Activity")).toBeInTheDocument();
    expect(screen.getByText("formatted:2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("formatted:2024-01-02")).toBeInTheDocument();
  });
});


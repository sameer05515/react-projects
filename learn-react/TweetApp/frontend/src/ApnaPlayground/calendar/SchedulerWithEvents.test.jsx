import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import SchedulerCalenderWithEvents from "./SchedulerCalenderWithEvents";
import SchedulerCalenderWithEventsWithViews from "./SchedulerCalenderWithEventsWithViews";

describe("ApnaPlayground/calendar with events", () => {
  const fixedDate = new Date(2023, 8, 15, 12, 0, 0); // Sep 15, 2023

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(fixedDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders event titles in month view for SchedulerCalenderWithEvents", async () => {
    render(<SchedulerCalenderWithEvents />);

    // Month header uses date-fns format
    expect(screen.getByText(/September 2023/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Meeting")).toBeInTheDocument();
      expect(screen.getByText("Appointment")).toBeInTheDocument();
      expect(screen.getByText("Event")).toBeInTheDocument();
    });
  });

  it("renders event titles and can switch to week view for SchedulerCalenderWithEventsWithViews", async () => {
    render(<SchedulerCalenderWithEventsWithViews />);

    expect(screen.getByText(/September 2023/i)).toBeInTheDocument();
    expect(screen.getByText("Appointment")).toBeInTheDocument();

    // Switch to week view
    fireEvent.click(screen.getByRole("button", { name: /Week/i }));

    await waitFor(() => {
      expect(screen.getByText("Appointment")).toBeInTheDocument();
    });
  });
});


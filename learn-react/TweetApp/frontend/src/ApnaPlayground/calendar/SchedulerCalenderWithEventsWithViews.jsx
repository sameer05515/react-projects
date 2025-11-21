import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subMonths
} from "date-fns";
import React, { useState } from "react";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [events] = useState([
    { date: new Date(2023, 8, 10), title: "Meeting" },
    { date: new Date(2023, 8, 15), title: "Appointment" },
    { date: new Date(2023, 8, 25), title: "Event" },
  ]);
  const [view, setView] = useState("month"); // Default view is month

  const renderCalendar = () => {
    let startDate, endDate;

    switch (view) {
      case "week":
        startDate = startOfWeek(date);
        endDate = endOfWeek(date);
        break;
      case "day":
        startDate = date;
        endDate = date;
        break;
      default:
        startDate = startOfMonth(date);
        endDate = endOfMonth(date);
        break;
    }

    const calendarDays = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      calendarDays.push({
        date: currentDate,
        dayOfMonth: currentDate.getDate(),
      });
      currentDate = addDays(currentDate, 1);
    }

    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              className="rounded border border-gray-300 bg-white px-2 py-1 text-sm hover:bg-gray-50"
              onClick={() => setDate(subMonths(date, 1))}
              title="Previous"
            >
              &lt;
            </button>
            <h2 className="text-base font-semibold text-gray-900">
              {format(date, view === "month" ? "MMMM yyyy" : "MMMM d, yyyy")}
            </h2>
            <button
              className="rounded border border-gray-300 bg-white px-2 py-1 text-sm hover:bg-gray-50"
              onClick={() => setDate(addMonths(date, 1))}
              title="Next"
            >
              &gt;
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView("month")}
              className={`rounded px-2 py-1 text-sm ${
                view === "month"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`rounded px-2 py-1 text-sm ${
                view === "week"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView("day")}
              className={`rounded px-2 py-1 text-sm ${
                view === "day"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
              }`}
            >
              Day
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleDayClick(day.date)}
              className={`min-h-[90px] rounded border p-2 text-left text-sm transition-colors ${
                isSameDay(day.date, new Date())
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100"
              }`}
              title={format(day.date, "PPPP")}
            >
              <div className="mb-1 font-medium">{day.dayOfMonth}</div>
              {renderEventsForDay(day.date)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleDayClick = (clickedDate) => {
    // Handle clicking on a specific day, e.g., show a modal with events for that day
    console.log("Clicked on date:", clickedDate);
  };

  const renderEventsForDay = (day) => {
    const dayEvents = events.filter((event) => isSameDay(event.date, day));
    return (
      <div className="mt-1 space-y-1">
        {dayEvents.map((event, index) => (
          <div
            key={index}
            className="truncate rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700"
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  };

  return <div className="mx-auto max-w-5xl">{renderCalendar()}</div>;
};

export default Calendar;

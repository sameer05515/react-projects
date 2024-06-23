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
import "../../common/styles/calendar-with-events.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
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
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setDate(subMonths(date, 1))}>&lt;</button>
          <h2>
            {format(date, view === "month" ? "MMMM yyyy" : "MMMM d, yyyy")}
          </h2>
          <button onClick={() => setDate(addMonths(date, 1))}>&gt;</button>
          <div className="view-buttons">
            <button
              onClick={() => setView("month")}
              className={view === "month" ? "active" : ""}
            >
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={view === "week" ? "active" : ""}
            >
              Week
            </button>
            <button
              onClick={() => setView("day")}
              className={view === "day" ? "active" : ""}
            >
              Day
            </button>
          </div>
        </div>
        <div className="calendar-body">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`calendar-day${isSameDay(day.date, new Date()) ? " today" : ""
                }`}
              onClick={() => handleDayClick(day.date)}
            >
              {day.dayOfMonth}
              {renderEventsForDay(day.date)}
            </div>
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
      <div className="events">
        {dayEvents.map((event, index) => (
          <div key={index} className="event">
            {event.title}
          </div>
        ))}
      </div>
    );
  };

  return <div className="calendar-container">{renderCalendar()}</div>;
};

export default Calendar;

import React, { useState } from "react";
import { format, addMonths, subMonths, isToday, isSameMonth, isSameDay } from "date-fns";
import '../../styles/calendar-with-events.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: new Date(2023, 8, 10), title: "Meeting" },
    { date: new Date(2023, 8, 15), title: "Appointment" },
    { date: new Date(2023, 8, 25), title: "Event" },
  ]);

  const renderCalendar = () => {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = endDate.getDate();

    const calendarDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);
      calendarDays.push({ date: day, dayOfMonth: i });
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setDate(subMonths(date, 1))}>&lt;</button>
          <h2>{format(date, "MMMM yyyy")}</h2>
          <button onClick={() => setDate(addMonths(date, 1))}>&gt;</button>
        </div>
        <div className="calendar-body">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`calendar-day${isSameDay(day.date, new Date()) ? " today" : ""}`}
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

  return (
    <div className="calendar-container">
      {renderCalendar()}
    </div>
  );
};

export default Calendar;

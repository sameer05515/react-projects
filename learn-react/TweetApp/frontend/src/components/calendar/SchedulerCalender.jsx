import React, { useState } from "react";

import '../../styles/calendar.css'

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const renderCalendar = () => {
    // Logic to render the calendar for the selected date
    // You can use libraries like date-fns or moment.js for date manipulation

    // Example: Render a simple monthly calendar
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(<div key={`day-${i}`} className="calendar-day">{i}</div>);
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}>&lt;</button>
          <h2>{date.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
          <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}>&gt;</button>
        </div>
        <div className="calendar-body">
          {calendarDays}
        </div>
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

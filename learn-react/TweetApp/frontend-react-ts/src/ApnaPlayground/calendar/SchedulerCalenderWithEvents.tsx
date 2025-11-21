import React, { useState } from "react";
import { addMonths, subMonths, format, isSameDay } from "date-fns";

const CalendarWithEvents = () => {
  const [date, setDate] = useState(new Date());
  const [events] = useState([
    { date: new Date(2023, 8, 10), title: "Meeting" },
    { date: new Date(2023, 8, 15), title: "Appointment" },
    { date: new Date(2023, 8, 25), title: "Event" },
  ]);

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const calendarDays: JSX.Element[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-16 rounded-lg border border-transparent" />);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(date.getFullYear(), date.getMonth(), i);
    const dayEvents = events.filter((event) => isSameDay(event.date, day));
    calendarDays.push(
      <div
        key={`day-${i}`}
        className={`flex h-16 flex-col rounded-lg border border-gray-200 bg-white p-2 text-sm shadow-sm transition hover:bg-blue-50 ${
          isSameDay(day, new Date()) ? "border-blue-400 ring-2 ring-blue-200" : ""
        }`}
      >
        <span className="font-semibold text-gray-900">{i}</span>
        <div className="mt-1 flex flex-col gap-1">
          {dayEvents.map((event, idx) => (
            <span
              key={`${event.title}-${idx}`}
              className="rounded bg-blue-100 px-1 text-[10px] font-semibold text-blue-700"
            >
              {event.title}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="flex items-center justify-between rounded-t-2xl bg-blue-600 px-4 py-3 text-white">
        <button
          className="rounded-full bg-white/20 px-2 py-1 text-lg font-bold transition hover:bg-white/30"
          onClick={() => setDate(subMonths(date, 1))}
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">{format(date, "MMMM yyyy")}</h2>
        <button
          className="rounded-full bg-white/20 px-2 py-1 text-lg font-bold transition hover:bg-white/30"
          onClick={() => setDate(addMonths(date, 1))}
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 bg-slate-50 p-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-semibold uppercase text-gray-500">
            {day}
          </div>
        ))}
        {calendarDays}
      </div>
    </div>
  );
};

export default CalendarWithEvents;

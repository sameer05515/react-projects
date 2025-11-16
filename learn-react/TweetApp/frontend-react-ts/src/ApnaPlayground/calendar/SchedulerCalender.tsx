import React, { useState } from "react";

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const calendarDays: JSX.Element[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(
      <div key={`empty-${i}`} className="h-10 rounded-lg border border-transparent" />
    );
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(
      <div
        key={`day-${i}`}
        className="flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm transition hover:bg-blue-50"
      >
        {i}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="flex items-center justify-between rounded-t-2xl bg-blue-600 px-4 py-3 text-white">
        <button
          className="rounded-full bg-white/20 px-2 py-1 text-lg font-bold transition hover:bg-white/30"
          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {date.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <button
          className="rounded-full bg-white/20 px-2 py-1 text-lg font-bold transition hover:bg-white/30"
          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}
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

export default Calendar;

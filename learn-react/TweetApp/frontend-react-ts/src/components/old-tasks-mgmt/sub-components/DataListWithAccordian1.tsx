import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../redux/slices/dataSlice1";
import type { RootState } from "../../../redux/store";

const DataList = ({ itemSelectionHandler = () => {} }) => {
  const dispatch = useDispatch();
  const dataList = useSelector((state: RootState) => state.data as any[]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  const showData = (date) => {
    setSelectedDate((prevDate) => (prevDate === date ? null : date));
  };

  const groupedData: Record<string, any[]> = {};
  dataList.forEach((item: any) => {
    const date = format(new Date(item.date), "dd/MMM/yyyy", { locale: enGB });
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(item);
  });

  return (
    <div className="space-y-3">
      {Object.entries(groupedData).map(([date, items]: [string, any[]]) => {
        const isOpen = selectedDate === date;
        return (
          <div key={date} className="rounded border border-gray-300">
            <div className="bg-gray-100 p-2">
              <button
                className="w-full text-left text-base font-semibold text-gray-900"
                onClick={() => showData(date)}
                aria-expanded={isOpen}
              >
                {date}
              </button>
            </div>
            {isOpen && (
              <div className="space-y-3 p-4">
                {items.map((item) => (
                  <div key={item._id}>
                    <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-700">{item.htmlText}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DataList;

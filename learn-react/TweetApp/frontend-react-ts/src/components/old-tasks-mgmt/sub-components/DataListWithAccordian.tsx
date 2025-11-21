import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { fetchData } from "../../../redux/slices/dataSlice1";
import type { RootState } from "../../../redux/store";

const DataList = ({ itemSelectionHandler = (_id: string) => {} }: { itemSelectionHandler?: (id: string) => void }) => {
  const dispatch: AppDispatch = useDispatch();
  const dataList = useSelector((state: RootState) => state.data as any[]);
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  const showData = (id: string) => {
    itemSelectionHandler(id);
    setSelectedItemId(id);
  };

  // Group data by date
  const dataByDate: Record<string, any[]> = {};
  dataList.forEach((item: any) => {
    const formattedDate = format(new Date(item.date), "dd/MMM/yyyy", { locale: enGB });
    if (!dataByDate[formattedDate]) {
      dataByDate[formattedDate] = [];
    }
    dataByDate[formattedDate].push(item);
  });

  return (
    <div>
      {Object.entries(dataByDate).map(([date, items]: [string, any[]]) => (
        <div key={date} className="mt-4">
          <h4 className="mb-2 font-semibold text-gray-900">{date}</h4>
          <div className="space-y-2">
            {items.map((item) => {
              const isOpen = selectedItemId === item._id;
              return (
                <div className="rounded border border-gray-200 bg-white shadow-sm" key={item._id}>
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => showData(item._id)}
                    aria-expanded={isOpen}
                    aria-controls={`collapse_${item._id}`}
                  >
                    <div className="px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50">
                      {item.title}
                    </div>
                  </button>
                  {isOpen && (
                    <div id={`collapse_${item._id}`} className="border-t border-gray-200 px-3 py-2 text-sm text-gray-700">
                      <p className="text-gray-500">
                        [ {format(new Date(item.date), "dd/MMM/yyyy", { locale: enGB })} ]
                      </p>
                      <p>{item.htmlText}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataList;

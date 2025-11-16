import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../redux/slices/dataSlice1"; 
import type { RootState } from "../../../redux/store";

const DataList = ({ itemSelectionHandler = (_id: string) => {} }: { itemSelectionHandler?: (id: string) => void }) => {
  const dispatch = useDispatch();
  const dataList = useSelector((state: RootState) => state.data as any[]);
  const [selectedItemId, setSelectedItemId] = useState<string>("");

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const showData = (id: string) => {
    itemSelectionHandler(id);
    setSelectedItemId(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, id: string) => {
    if (e.key === "Enter") {
      showData(id);
    }
  };

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <ul className="list-none p-0">
        {dataList.map((item) => (
          <li
            key={item._id}
            onClick={() => showData(item._id)}
            onKeyDown={(e) => handleKeyDown(e, item._id)}
            className={`${selectedItemId === item._id ? "selected-item font-bold" : "font-normal"} p-4 cursor-pointer hover:bg-gray-100 transition-colors`}
          >
            [ {format(new Date(item.date), "dd/MMM/yyyy", { locale: enGB })} ] -
            : {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;

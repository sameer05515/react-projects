import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/dataSlice1";
import "./DataList.css"; // Import custom CSS for styling

const DataList = ({ itemSelectionHandler = () => {} }) => {
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.data);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const showData = (date) => {
    setSelectedDate((prevDate) => (prevDate === date ? null : date));
  };

  const groupedData = {};
  dataList.forEach((item) => {
    const date = format(new Date(item.date), "dd/MMM/yyyy", { locale: enGB });
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(item);
  });

  return (
    <div>
      {Object.entries(groupedData).map(([date, items]) => (
        <div key={date} className="data-item">
          <div className="date-accordion">
            <button
              className="date-toggle"
              onClick={() => showData(date)}
              aria-expanded={selectedDate === date}
            >
              {date}
            </button>
          </div>
          <div className={`data-content ${selectedDate === date ? "expanded" : ""}`}>
            {items.map((item) => (
              <div key={item._id}>
                <h3>{item.title}</h3>
                <p>{item.htmlText}</p>
                {/* Display other data fields */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataList;

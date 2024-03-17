import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/dataSlice1";

const DataList = ({ itemSelectionHandler = () => {} }) => {
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state.data);
  const [selectedItemId, setSelectedItemId] = useState("");

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const showData = (id) => {
    itemSelectionHandler(id);
    setSelectedItemId(id);
  };

  // Group data by date
  const dataByDate = {};
  dataList.forEach((item) => {
    const formattedDate = format(new Date(item.date), "dd/MMM/yyyy", { locale: enGB });
    if (!dataByDate[formattedDate]) {
      dataByDate[formattedDate] = [];
    }
    dataByDate[formattedDate].push(item);
  });

  return (
    <div>
      {Object.entries(dataByDate).map(([date, items]) => (
        <div key={date}>
          <h4 className="mt-4">{date}</h4>
          <div className="accordion" id={`accordion_${date}`}>
            {items.map((item) => (
              <div className="card" key={item._id}>
                <div className="card-header" id={`heading_${item._id}`}>
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target={`#collapse_${item._id}`}
                      aria-expanded="true"
                      aria-controls={`collapse_${item._id}`}
                      onClick={() => showData(item._id)}
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      {item.title}
                    </button>
                  </h5>
                </div>

                <div
                  id={`collapse_${item._id}`}
                  className={`collapse ${selectedItemId === item._id ? "show" : ""}`}
                  aria-labelledby={`heading_${item._id}`}
                  data-parent={`#accordion_${date}`}
                >
                  <div className="card-body">
                    <p>[ {format(new Date(item.date), "dd/MMM/yyyy", { locale: enGB })} ]</p>
                    <p>{item.htmlText}</p>
                    {/* Display other data fields in the card body */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataList;

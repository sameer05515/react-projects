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

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      showData(id);
    }
  };

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {dataList.map((item) => (
          <li
            key={item._id}
            onClick={() => showData(item._id)}
            onKeyDown={(e) => handleKeyDown(e, item._id)}
            className={selectedItemId === item._id ? "selected-item" : ""}
            style={{
              fontWeight: selectedItemId === item._id ? "bold" : "normal",
              padding: "15px",
            }}
          >
            [ {format(new Date(item.date), "dd/MMM/yyyy", { locale: enGB })} ] -
            : {item.title}
            {/* <div dangerouslySetInnerHTML={{ __html: item.htmlText }} /> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;

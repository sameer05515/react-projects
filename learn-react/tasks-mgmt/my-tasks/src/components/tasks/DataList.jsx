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

  return (
    <div>
      <h2>Data List</h2>
      {/* {JSON.stringify(dataList)} */}
      <ul>
        {dataList.map((item) => (
          <li
            key={item._id}
            onClick={() => showData(item._id)}
            className={selectedItemId === item._id ? "selected-item" : ""}
          >
            [ {format(new Date(item.date), "dd/MMM/yyyy", { locale: enGB })} ] -
            Title: {item.title}
            <div dangerouslySetInnerHTML={{ __html: item.htmlText }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;

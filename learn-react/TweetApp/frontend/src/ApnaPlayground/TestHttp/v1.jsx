import React from "react";
import {
  fetchThinkTankItems,
  saveThinkTankItem,
} from "../../components/my-reports/ThinkTank/utils/ThinkTankApiServices";
import { myTodos } from "../../components/my-reports/ThinkTank/data";

const convertToISTDateWithTime = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") {
    throw new Error("Date string should be non-null and a string");
  }

  // Parse date in IST by appending the time
  const parsedDate = new Date(`${dateStr} 10:00:00 GMT+0530`);

  if (isNaN(parsedDate)) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  return parsedDate.toISOString(); // Converts to UTC format for API
};

const TestHttpV1 = () => {
  // const [messages, setMessages] = useState([]);
  const handleFetchThninkTankItems = () =>
    fetchThinkTankItems({})
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  const handleSaveThinkTankItem = () =>
    saveThinkTankItem({
      smartContent: {
        textOutputType: "html",
        // content: "<b>Create My Todo list</b> 2145/02Feb25 \n\n - Successfully created basic structure of Todo.",
        textInputType: "TextArea",
      },
    })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

const checkAnyInvalidCreateDate=()=>{
  const myMap={};
  for(let todo of myTodos){
    if(!myMap[todo.createdDate]){

    }
    console.log(todo.createdDate,"    :    ", convertToISTDateWithTime(todo.createdDate));
  }
}
    
  return (
    <div className="container-fluid">
      <button className="btn btn-primary btn-sm mx-1" onClick={handleFetchThninkTankItems}>
        Fetch all ThinkTank items
      </button>
      <button className="btn btn-primary btn-sm mx-1" onClick={handleSaveThinkTankItem}>
        Save ThinkTank Item
      </button>

      <button className="btn btn-primary btn-sm mx-1" onClick={checkAnyInvalidCreateDate}>
        Validate dates
      </button>
    </div>
  );
};

export default TestHttpV1;

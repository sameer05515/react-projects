import React, { useState } from "react";
import {
  fetchThinkTankItems,
  saveThinkTankItem,
  updateThinkTankItem,
} from "../../components/my-reports/ThinkTank/utils/ThinkTankApiServices";
import { myTodos } from "../../components/my-reports/ThinkTank/data";
import { prepareErrorMessage } from "../../common/hooks/useConsolidated/message-preparation-utils";
import { delayForMS } from "../sample-promises";

const convertToISTDateWithTime = (dateStr, minutes = 10) => {
  console.log(dateStr, "", minutes, "\n========================\n");
  if (!dateStr || typeof dateStr !== "string") {
    throw new Error("Date string should be non-null and a string");
  }

  // Parse date in IST by appending the time
  const parsedDate = new Date(`${dateStr} 10:${minutes}:00 GMT+0530`);

  if (isNaN(parsedDate)) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  return parsedDate.toISOString(); // Converts to UTC format for API
};

const TestHttpV1 = () => {
  const [messages, setMessages] = useState([]);
  const handleFetchThninkTankItems = () =>
    fetchThinkTankItems({})
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  const handleSaveThinkTankItem = () =>
    saveThinkTankItem({
      smartContent: {
        textOutputType: "html",
        content: "<b>Create My Todo list</b> 2145/02Feb25 \n\n - Successfully created basic structure of Todo.",
        textInputType: "TextArea",
      },
    })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

  const checkAnyInvalidCreateDate = () => {
    const myMap = {};
    for (let todo of myTodos) {
      if (!myMap[todo.createdDate]) {
        myMap[todo.createdDate] = 10;
      }
      const minutes = myMap[todo.createdDate] + 1;
      const myStr = `${todo.createdDate}, "    :    ", ${convertToISTDateWithTime(todo.createdDate, minutes)}`;
      console.log(myStr);
      setMessages((prev) => [{ id: `msg_no_${prev.length + 1}`, type: "success", message: myStr }, ...prev]);
      myMap[todo.createdDate] = minutes;
    }
    console.log(myMap);
  };

  const saveAllOldTodos = async () => {
    setMessages([]);
    const myMap = {};
    for (let todo of myTodos) {
      try {
        if (!myMap[todo.createdDate]) {
          myMap[todo.createdDate] = 10;
        }
        //================= Save phase
        const saveResp = await saveThinkTankItem({ smartContent: todo.smartContent, itemType: todo.itemType });
        if (saveResp.isError) {
          throw new Error(saveResp.message);
        }
        const uniqueId = saveResp.data.uniqueId;
        const saveMsg = `Successfully recieved uniqueId: ${uniqueId}`;
        setMessages((prev) => [{ id: `msg_no_${prev.length + 1}`, type: "success", message: saveMsg }, ...prev]);
        await delayForMS(300);

        //================= Update phase
        const minutes = myMap[todo.createdDate] + 1;

        const updateResp = await updateThinkTankItem(uniqueId, {
          ...todo,
          createdDate: convertToISTDateWithTime(todo.createdDate, minutes),
        });
        if (updateResp.isError) {
          throw new Error(updateResp.message);
        }
        const updateMsg = `Successfully updated uniqueId: ${uniqueId}`;
        setMessages((prev) => [{ id: `msg_no_${prev.length + 1}`, type: "success", message: updateMsg }, ...prev]);

        myMap[todo.createdDate] = minutes;
        await delayForMS(300);
      } catch (error) {
        const errMsg = prepareErrorMessage(error, "Something unexpected occurred!");
        setMessages((prev) => [{ id: `msg_no_${prev.length + 1}`, type: "error", message: errMsg }, ...prev]);
      }
    }
  };

  return (
    <div className="container-fluid">
      <div>
        <h1>Total Todos: {myTodos.length}</h1>
      </div>
      <button className="btn btn-outline-primary btn-sm" onClick={() => setMessages([])}>
        Clear Messages
      </button>
      <button className="btn btn-primary btn-sm mx-1" onClick={handleFetchThninkTankItems}>
        Fetch all ThinkTank items
      </button>
      <button className="btn btn-primary btn-sm mx-1" onClick={handleSaveThinkTankItem}>
        Save ThinkTank Item
      </button>

      <button className="btn btn-primary btn-sm mx-1" onClick={checkAnyInvalidCreateDate}>
        Validate dates
      </button>
      <button className="btn btn-primary btn-sm mx-1" onClick={saveAllOldTodos}>
        Save All Old Todos
      </button>
      <div className="border border-primary" style={{ maxHeight: "300px", overflowY: "auto" }}>
        {messages &&
          Array.isArray(messages) &&
          messages.map(({ id, message, type }) => (
            <div key={id}>
              <span className={type === "success" ? "text-bg-success" : "text-bg-danger"}>
                [{new Date().toString()}]: {message}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TestHttpV1;

import React from "react";
import {
  fetchThinkTankItems,
  saveThinkTankItem,
} from "../../components/my-reports/ThinkTank/utils/ThinkTankApiServices";

const TestHttpV1 = () => {
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
  return (
    <div className="container-fluid">
      <button className="btn btn-primary btn-sm mx-1" onClick={handleFetchThninkTankItems}>
        Fetch all ThinkTank items
      </button>
      <button className="btn btn-primary btn-sm mx-1" onClick={handleSaveThinkTankItem}>
        Save ThinkTank Item
      </button>
    </div>
  );
};

export default TestHttpV1;

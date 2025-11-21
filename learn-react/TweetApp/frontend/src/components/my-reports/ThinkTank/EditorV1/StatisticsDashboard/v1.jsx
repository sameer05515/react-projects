import React, { useState } from "react";
import SelectStatisticsIteration from "./SelectStatisticsIteration";
import ShowStatistics from "./ShowStatistics/itr1";

const StatisticsDashboardV1 /**: React.FC*/ = () => {
  const [selectedIteration, setSelectedIteration] = useState(/**<string | null>*/ null);

  return (
    <div className="container mt-5">
      {!selectedIteration ? (
        <SelectStatisticsIteration onSelectIteration={setSelectedIteration} />
      ) : (
        <ShowStatistics iteration={selectedIteration} />
      )}
    </div>
  );
};

export default StatisticsDashboardV1;

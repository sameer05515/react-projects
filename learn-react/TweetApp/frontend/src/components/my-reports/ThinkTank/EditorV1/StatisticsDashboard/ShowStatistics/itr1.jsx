import React, { useEffect, useState } from "react";
import axios from "axios";

// interface StatisticsData {
//   totalCount: number;
//   createdToday: number;
//   closedToday: number;
//   groomedToday: number;
//   currentlyWorkingOn: number;
//   onHold: number;
// }

const ShowStatisticsItr1/**: React.FC<{ iteration: string }>*/ = ({ iteration }) => {
  const [statistics, setStatistics] = useState/**<StatisticsData | null>*/(null);
  const [loading, setLoading] = useState/**<boolean>*/(true);
  const [error, setError] = useState/**<string | null>*/(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(` http://localhost:3003/think-tank/v1/stats/${iteration}`)
      .then((response) => {
        setStatistics(response.data);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to load statistics.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [iteration]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Statistics for {iteration}</h2>

      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {statistics && (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Total Count</th>
              <td>{statistics.totalCount}</td>
            </tr>
            <tr>
              <th>Created Today</th>
              <td>{statistics.createdToday}</td>
            </tr>
            <tr>
              <th>Closed Today</th>
              <td>{statistics.closedToday}</td>
            </tr>
            <tr>
              <th>Groomed Today</th>
              <td>{statistics.groomedToday}</td>
            </tr>
            <tr>
              <th>Currently Working On</th>
              <td>{statistics.currentlyWorkingOn}</td>
            </tr>
            <tr>
              <th>On Hold</th>
              <td>{statistics.onHold}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowStatisticsItr1;

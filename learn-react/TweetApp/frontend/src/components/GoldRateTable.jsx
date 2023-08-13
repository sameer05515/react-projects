import React from "react";
import GOLD_RATE from "../common/goldRate";  // Replace with the actual path to your JSON file

const GoldRateTable = () => {
  return (
    <div>
      <h2>Gold Rate Data</h2>
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Year</th>
            <th>Price (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {GOLD_RATE.data.map((item) => (
            <tr key={item.year}>
              <td>{item.year}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoldRateTable;

import React from 'react';

// Function to format a date to dd-MMM-yyyy
const formatDateToDDMMMYYYY = (dateStr) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const ActionableList = ({ activities }) => {
  return (
    <div>
      <h2>Activity List</h2>
      <table>
        <thead>
          <tr>
            <th>Activity Name</th>
            <th>Recurrence</th>
            <th>Should Continue</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.activityName}</td>
              <td>{activity.recurrence}</td>
              <td>{activity.shouldContinue}</td>
              <td>{formatDateToDDMMMYYYY(activity.startDate)}</td>
              <td>{formatDateToDDMMMYYYY(activity.endDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActionableList;

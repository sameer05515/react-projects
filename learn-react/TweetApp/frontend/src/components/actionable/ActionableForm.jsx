import React, { useState } from "react";
import './ActionableForm.css';
import { v4 as uuidv4 } from 'uuid';

const blankData= {
    activityName: "",
    activityDescription: "",
    recurrence: "OneTime",
    shouldContinue: "yes",
    startDate: "",
    endDate: "",
  };

const ActionableForm = ({
    initialData=blankData,
      postSaveAction=()=>{}
}) => {
  const [formData, setFormData] = useState({...initialData});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., save to a database
    const newActionable = { ...formData, id: uuidv4() };
    console.log("Form data:", newActionable);
    postSaveAction(newActionable);
    setFormData({...blankData});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Activity Name</label>
          <input
            type="text"
            name="activityName"
            value={formData.activityName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Activity Description</label>
          <textarea
            rows="3"
            name="activityDescription"
            value={formData.activityDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Recurrence</label>
          <select
            name="recurrence"
            value={formData.recurrence}
            onChange={handleChange}
          >
            <option value="OneTime">One Time</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
        <div className="form-group">
          <label>Should Continue</label>
          <div>
            <input
              type="radio"
              name="shouldContinue"
              value="yes"
              checked={formData.shouldContinue === "yes"}
              onChange={handleChange}
            />
            <label>Yes</label>
            <input
              type="radio"
              name="shouldContinue"
              value="no"
              checked={formData.shouldContinue === "no"}
              onChange={handleChange}
            />
            <label>No</label>
          </div>
        </div>
      </div>

      <div className="form-row">
      <div className="form-group">
      <label>Start Date</label>
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      </div>

      <div className="form-group">
      <label>End Date</label>
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      </div>
      </div>

      

      

      <button type="submit">Save Activity</button>
    </form>
  );
};

export default ActionableForm;

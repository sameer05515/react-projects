import React, { useState } from "react";
import dayjs from "dayjs";

const CreateNewTask = () => {
  // State to manage the data entered by the user
  const [data, setData] = useState("");
  

  // Function to handle changes in the input field
  const handleChange = (e) => {
    setData(e.target.value);
  };

  // Function to save the data in localStorage
  const handleSave = () => {
    // Check if data is not empty
    if (data.trim() !== "") {
      localStorage.setItem("savedData", data);
      alert("Data saved successfully!");
    } else {
      alert("Please enter some data before saving.");
    }
  };

  return (
    <div>
      <h1>Save Data</h1>
      {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
<DatePicker
  label="Controlled picker"
  value={value}
  onChange={(newValue) => setValue(newValue)}
/> */}
      <input
        type="text"
        value={data}
        onChange={handleChange}
        placeholder="Enter data"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default CreateNewTask;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { saveData as addData } from "../../redux/dataSlice1";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./SaveDataComponent.css"; // Import custom CSS for styling
import tagList from "./tagList";

const SaveDataComponent = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagFilterText, setTagFilterText] = useState("");
  const [privateData, setPrivateData] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleHtmlTextChange = (value) => {
    setHtmlText(value);
  };

  const handleTagFilterChange = (event) => {
    setTagFilterText(event.target.value);
  };

  const handleTagCheckboxChange = (event) => {
    const selectedTag = event.target.name;
    setSelectedTags((prevSelectedTags) =>
      event.target.checked
        ? [...prevSelectedTags, selectedTag]
        : prevSelectedTags.filter((tag) => tag !== selectedTag)
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedDate.trim()) {
      newErrors.selectedDate = "Date is required";
    }

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!htmlText.trim()) {
      newErrors.htmlText = "HTML Text is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const newData = {
        date: selectedDate,
        title,
        htmlText,
        tags: selectedTags,
        private: privateData,
      };
      dispatch(addData(newData));
      // console.log("Data saved successfully");
      // Optionally, you can display a success message or clear the form after saving.
    }
  };

  const filteredTagList = tagList.filter((tag) =>
    tag.toLowerCase().includes(tagFilterText.toLowerCase())
  );

  return (
    <div>
      <h2>Save Data</h2>
      <div>
        <TextField
          label="Date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          error={Boolean(errors.selectedDate)}
          helperText={errors.selectedDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          error={Boolean(errors.title)}
          helperText={errors.title}
        />
      </div>
      <div>
        <Typography variant="subtitle1">HTML Text:</Typography>
        <ReactQuill
          value={htmlText}
          onChange={handleHtmlTextChange}
          error={Boolean(errors.htmlText)}
        />
        {errors.htmlText && (
          <Typography variant="caption" color="error">
            {errors.htmlText}
          </Typography>
        )}
      </div>
      <div>
        <TextField
          label="Filter Tags"
          value={tagFilterText}
          onChange={handleTagFilterChange}
        />
        <div className="tag-dropdown">
          <FormGroup>
            {filteredTagList.map((tag) => (
              <FormControlLabel
                key={tag}
                control={
                  <Checkbox
                    checked={selectedTags.includes(tag)}
                    onChange={handleTagCheckboxChange}
                    name={tag}
                  />
                }
                label={tag}
              />
            ))}
          </FormGroup>
        </div>
        <div className="selected-tags-container">
          {selectedTags.map((tag) => (
            <div key={tag} className="selected-tag">
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div>
        {/* New input for the 'private' field */}
        <FormControlLabel
          control={
            <Checkbox
              checked={privateData}
              onChange={(e) => setPrivateData(e.target.checked)}
              color="primary"
            />
          }
          label="Private"
        />
      </div>
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default SaveDataComponent;

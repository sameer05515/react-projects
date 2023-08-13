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
import { updateData } from "../../redux/dataSlice1";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import "./SaveDataComponent.css"; // Import custom CSS for styling
import tagList from "./tagList";
import GitDiff from '../GitDiff'

const EditDataComponent = ({ savedData }) => {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(savedData.date), "yyyy-MM-dd", { locale: enGB })
  );
  const [title, setTitle] = useState(savedData.title);
  const [htmlText, setHtmlText] = useState(savedData.htmlText);
  const [selectedTags, setSelectedTags] = useState(savedData.tags || []);
  const [privateData, setPrivateData] = useState(savedData.private || false);
  const [tagFilterText, setTagFilterText] = useState("");
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

  const handleSave = async () => {
    if (validateForm()) {
      const newData = {
        id: savedData._id,
        date: selectedDate,
        title,
        htmlText,
        tags: selectedTags,
        private: privateData,
      };
      dispatch(updateData(newData));

      // Optionally, you can display a success message or clear the form after saving.
    }
  };

  const filteredTagList = tagList.filter((tag) =>
    tag.toLowerCase().includes(tagFilterText.toLowerCase())
  );

  return (
    <div>
      <h2>Edit Data</h2>
      {selectedDate}
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

      <hr/>
      <GitDiff oldContent={savedData.htmlText} newContent={htmlText}/>
    </div>
  );
};

export default EditDataComponent;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../redux/dataSlice1";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./UpdateDataComponent.css"; // Import custom CSS for styling

const UpdateDataComponent = ({ match, history }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagFilterText, setTagFilterText] = useState("");
  const [errors, setErrors] = useState({});

  const tagList = ["Tag 1", "Tag 2", "Tag 3"]; // Replace this with your list of tags

  useEffect(() => {
    const selectedItem = data.find((item) => item.id === id);
    if (selectedItem) {
      setSelectedDate(selectedItem.date);
      setTitle(selectedItem.title);
      setHtmlText(selectedItem.htmlText);
      setSelectedTags(selectedItem.tags || []);
    }
  }, [data, id]);

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

  const handleUpdate = () => {
    if (validateForm()) {
      const updatedData = {
        id,
        date: selectedDate,
        title,
        htmlText,
        tags: selectedTags,
      };
      dispatch(updateData(updatedData));
      history.push("/"); // Redirect to the data list after updating
    }
  };

  const filteredTagList = tagList.filter((tag) =>
    tag.toLowerCase().includes(tagFilterText.toLowerCase())
  );

  return (
    <div>
      <h2>Edit Data</h2>
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
      <Button variant="contained" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
};

export default UpdateDataComponent;

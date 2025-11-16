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
import { updateData } from "../../../redux/slices/dataSlice1"; 
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import tagList from "./tagList";
import GitDiff from '../../../ApnaPlayground/GitDiff/v1'

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
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Edit Data</h2>
      <div className="text-xs text-gray-500">{selectedDate}</div>
      <div className="grid gap-4 md:grid-cols-2">
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
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          error={Boolean(errors.title)}
          helperText={errors.title}
        />
      </div>
      <div className="rounded border border-gray-200 p-3">
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
      <div className="rounded border border-gray-200 p-3">
        <TextField
          label="Filter Tags"
          value={tagFilterText}
          onChange={handleTagFilterChange}
          className="mb-2"
        />
        <div className="max-h-40 overflow-y-auto rounded border border-gray-300 p-1">
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
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span key={tag} className="inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded border border-gray-200 p-3">
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
      <Button variant="contained" onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">
        Save
      </Button>

      <hr className="my-4"/>
      <GitDiff oldContent={savedData.htmlText} newContent={htmlText}/>
    </div>
  );
};

export default EditDataComponent;

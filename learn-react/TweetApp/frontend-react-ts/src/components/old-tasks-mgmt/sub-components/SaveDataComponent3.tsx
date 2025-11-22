import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { saveData } from "../../../redux/slices/dataSlice"; // ✅ Consolidated: dataSlice1 -> dataSlice
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SaveDataComponent = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [htmlText, setHtmlText] = useState<string>("");
  const [errors, setErrors] = useState<{ selectedDate?: string; title?: string; htmlText?: string }>({});

  const dispatch: AppDispatch = useDispatch();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleHtmlTextChange = (value: string) => {
    setHtmlText(value);
  };

  const validateForm = () => {
    const newErrors: { selectedDate?: string; title?: string; htmlText?: string } = {};

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
      const newData = { date: selectedDate, title, htmlText };
      dispatch(saveData(newData) as any);

      // Optionally, you can display a success message or clear the form after saving.
    }
  };

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
        />
        {errors.htmlText && (
          <Typography variant="caption" color="error">
            {errors.htmlText}
          </Typography>
        )}
      </div>
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default SaveDataComponent;

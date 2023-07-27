import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { saveData } from '../../redux/dataSlice1';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SaveDataComponent = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [title, setTitle] = useState('');
  const [htmlText, setHtmlText] = useState('');
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

  const validateForm = () => {
    const newErrors = {};

    if (!selectedDate.trim()) {
      newErrors.selectedDate = 'Date is required';
    }

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!htmlText.trim()) {
      newErrors.htmlText = 'HTML Text is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      const newData = { date: selectedDate, title, htmlText };
      dispatch(saveData(newData));
    
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
          error={Boolean(errors.htmlText)}
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

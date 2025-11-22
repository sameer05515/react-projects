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
import type { RootState, AppDispatch } from "../../../redux/store";
import { updateData } from "../../../redux/slices/dataSlice"; // ✅ Consolidated: dataSlice1 -> dataSlice
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type RouteLike = { params: { id: string } };
type UpdateDataProps = { match: RouteLike; history: { push: (path: string) => void } };
type ErrorState = { selectedDate?: string; title?: string; htmlText?: string };

const UpdateDataComponent = ({ match, history }: UpdateDataProps) => {
  const { id } = match.params;
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data as any[]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [htmlText, setHtmlText] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagFilterText, setTagFilterText] = useState<string>("");
  const [errors, setErrors] = useState<ErrorState>({});

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

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleHtmlTextChange = (value: string) => {
    setHtmlText(value);
  };

  const handleTagFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagFilterText(event.target.value);
  };

  const handleTagCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTag = event.target.name;
    setSelectedTags((prevSelectedTags) =>
      event.target.checked
        ? [...prevSelectedTags, selectedTag]
        : prevSelectedTags.filter((tag) => tag !== selectedTag)
    );
  };

  const validateForm = () => {
    const newErrors: ErrorState = {};

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
      dispatch(updateData(updatedData) as any);
      history.push("/"); // Redirect to the data list after updating
    }
  };

  const filteredTagList = tagList.filter((tag) =>
    tag.toLowerCase().includes(tagFilterText.toLowerCase())
  );

  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Edit Data</h2>
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
      <Button variant="contained" onClick={handleUpdate} className="bg-blue-600 text-white hover:bg-blue-700">
        Update
      </Button>
    </div>
  );
};

export default UpdateDataComponent;

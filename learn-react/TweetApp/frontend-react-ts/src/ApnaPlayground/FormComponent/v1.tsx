import React, { useState } from "react";
import { TextField, Button, Box, Container } from "@mui/material";

const FormComponentV1 = () => {
  const [formData, setFormData] = useState({
    date: "",
    text: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any actions you want to take with the form data
    console.log("Form Data:", formData);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <h2>Form Component</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="date"
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />

          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              id="text"
              name="text"
              label="Text"
              value={formData.text}
              onChange={handleInputChange}
              required
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </form>
        {JSON.stringify(formData)}
      </Box>
    </Container>
  );
};

export default FormComponentV1;

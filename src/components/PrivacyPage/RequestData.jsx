import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const RequestData = () => {
    const [country, setCountry] = useState("");
    const [format, setFormat] = useState("HTML");
    const [reason, setReason] = useState("");
  
    const handleSubmit = () => {
      alert("Data request submitted.");
    };
  
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom align="center">
            Request your personal data
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Before we get you a copy of your data, we’ll just need you to answer a few questions.
          </Typography>
  
          <FormControl fullWidth margin="normal">
            <InputLabel>Country/Region</InputLabel>
            <Select value={country} onChange={(e) => setCountry(e.target.value)} label="Country/Region">
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
            </Select>
          </FormControl>
  
          <FormControl fullWidth margin="normal">
            <InputLabel>In what format do you want your data?</InputLabel>
            <Select value={format} onChange={(e) => setFormat(e.target.value)} label="Format">
              <MenuItem value="HTML">Interactive web-content format (HTML)</MenuItem>
              <MenuItem value="JSON">Machine-readable format (JSON)</MenuItem>
            </Select>
          </FormControl>
  
          <FormControl fullWidth margin="normal">
            <InputLabel>Why are you requesting a copy of your data?</InputLabel>
            <Select value={reason} onChange={(e) => setReason(e.target.value)} label="Reason">
              <MenuItem value="privacy">Privacy concerns</MenuItem>
              <MenuItem value="review">Want to review my data</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
  
          <Box mt={3} display="flex" justifyContent="center">
            <Button sx={{background:"#484848"}} variant="contained" disabled={!country} onClick={handleSubmit}>
              Request data
            </Button>
          </Box>
  
          <Box mt={2} textAlign="center">
              <Button variant="text">Back</Button>
          </Box>
      </Container>
    );
  };
  export default RequestData ;
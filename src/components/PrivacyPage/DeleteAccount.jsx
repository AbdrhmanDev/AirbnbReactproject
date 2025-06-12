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
} from "@mui/material";
import { Link } from "react-router-dom";

const DeleteAccount = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    alert("Delete account request submitted.");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          Delete your account
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Submit a request to delete your personal data. To confirm you're the true owner of this account, we may contact you at your email. We will only be able to proceed with your request once you follow the steps set out in the email.
        </Typography>
        <Typography variant="subtitle2">About account deletion requests:</Typography>
        <ul>
          <li>If you have a checkout in the past 60 days, your deletion request can’t be processed until that period ends.</li>
          <li>Once processed, your data will be deleted except for legally required info (see our Privacy Policy).</li>
          <li>You’ll need a new account to use Airbnb in the future.</li>
          <li>Cancel any future reservations before deletion. Fees may apply (see Help Center).</li>
        </ul>

        <FormControl fullWidth margin="normal">
          <InputLabel>Country (required)</InputLabel>
          <Select value={country} onChange={(e) => setCountry(e.target.value)} label="Country">
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
          </Select>
        </FormControl>

        {country === "USA" && (
          <FormControl fullWidth margin="normal">
            <InputLabel>State</InputLabel>
            <Select value={state} onChange={(e) => setState(e.target.value)} label="State">
              <MenuItem value="California">California</MenuItem>
              <MenuItem value="Texas">Texas</MenuItem>
            </Select>
          </FormControl>
        )}

        <FormControl fullWidth margin="normal">
          <InputLabel>Why are you deleting your account?</InputLabel>
          <Select value={reason} onChange={(e) => setReason(e.target.value)} label="Reason">
            <MenuItem value="privacy">Privacy concerns</MenuItem>
            <MenuItem value="not-using">Not using the service</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <Box mt={3} display="flex" justifyContent="center">
          <Button variant="contained" sx={{background:"#484848"}} disabled={!country || (country === "USA" && !state)} onClick={handleSubmit}>
            Next
          </Button>
        </Box>

        <Box mt={2} textAlign="center">
            <Button variant="text">Back</Button>
        </Box>
    </Container>
  );
};
export default DeleteAccount;
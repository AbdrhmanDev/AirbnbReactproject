import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const HomeDetailsModal = ({ open, onClose, locationName }) => {
  const [editing, setEditing] = useState(false);
  const [selectedType, setSelectedType] = useState("entire");
  const [bedrooms, setBedrooms] = useState(2);
  const [inputValue, setInputValue] = useState(locationName);

  const handleLocationChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleLocationBlur = () => {
    setEditing(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box />
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            Tell us about your home
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Location */}
        <Box>
          <Typography fontWeight="bold" mb={1}>
            Address or area
          </Typography>
          {!editing ? (
            <Box
              sx={{
                p: 1.5,
                borderRadius: "12px",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                mb: 2,
              }}
              onClick={() => setEditing(true)}
            >
              <LocationOnIcon color="primary" />
              <Typography>{locationName}</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                p: 1.5,
                borderRadius: "12px",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <LocationOnIcon color="primary" />
              <input
                value={inputValue}
                onChange={handleLocationChange}
                onBlur={handleLocationBlur}
                placeholder="Where's your place?"
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "1rem",
                }}
              />
            </Box>
          )}
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Type of Space */}
        <Box mb={2}>
          <Typography fontWeight="bold" mb={1}>
            Type of space
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={selectedType}
            onChange={(e, val) => val && setSelectedType(val)}
            fullWidth
          >
            <ToggleButton value="entire" sx={{ textTransform: "none" }}>
              Entire place
            </ToggleButton>
            <ToggleButton value="private" sx={{ textTransform: "none" }}>
              Private room
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Bedrooms */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          sx={{
            color: selectedType === "private" ? "#B0B0B0" : "inherit", // إذا كانت "Private room"، اجعل اللون رمادي
          }}
        >
          <Typography fontWeight="bold">Bedrooms</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              variant="outlined"
              onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
              disabled={selectedType === "private"} // تعطيل الأزرار إذا كانت "Private room"
              sx={{
                color: selectedType === "private" ? "#B0B0B0" : "inherit", // تغيير اللون إلى رمادي باهت
                borderColor: selectedType === "private" ? "#B0B0B0" : "inherit", // تغيير لون الحدود إلى رمادي
              }}
            >
              -
            </Button>
            <Typography
              sx={{
                color: selectedType === "private" ? "#B0B0B0" : "inherit", // تغيير اللون إلى رمادي
              }}
            >
              {bedrooms}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setBedrooms(bedrooms + 1)}
              disabled={selectedType === "private"} // تعطيل الأزرار إذا كانت "Private room"
              sx={{
                color: selectedType === "private" ? "#B0B0B0" : "inherit", // تغيير اللون إلى رمادي باهت
                borderColor: selectedType === "private" ? "#B0B0B0" : "inherit", // تغيير لون الحدود إلى رمادي
              }}
            >
              +
            </Button>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Update Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "rgb(50, 51, 55)",
            color: "#fff",
            "&:hover": { bgcolor: "#000" },
            textTransform: "none",
          }}
        >
          Update your estimate
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default HomeDetailsModal;

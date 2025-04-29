// src/components/HomeDetailsLabel.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const HomeDetailsLabel = ({ locationName, onClick }) => {
  return (
    <Paper
      elevation={1}
      onClick={onClick}
      sx={{
        mt: 3,
        p: 4 ,
        borderRadius: "40px",
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        width: "fit-content",
      }}
    >
      <SearchIcon sx={{ color: "rgb(227, 28, 94)" }} />
      <Typography>
  <span style={{ fontWeight: "bold" }}>{locationName}</span>
  <span style={{ color: "gray" }}> .Entire place . 2 bedrooms</span>
</Typography>    </Paper>
  );
};

export default HomeDetailsLabel;

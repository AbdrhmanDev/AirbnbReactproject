import { Box ,Typography} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React from "react";

function DateSection() {
    return (
      <Box mt={2}>
        <Typography variant="subtitle1">5 nights in Santa Cruz de Tenerife</Typography>
        <Typography variant="body2" color="text.secondary">Jun 23, 2025 - Jun 28, 2025</Typography>
        <Box mt={1} display="flex" alignItems="center">
          <CalendarMonthIcon sx={{ mr: 1 }} />
          <Typography variant="body2">Calendar widget placeholder</Typography>
        </Box>
      </Box>
    );
  }
  export default DateSection;
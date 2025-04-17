import { Box, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { useState } from "react";
import React from "react";

function DateSection() {
  const [date, setDate] = useState(dayjs());
  return (
    <Box mt={2}>
      <Typography variant="subtitle1">5 nights in Santa Cruz de Tenerife</Typography>
      <Typography variant="body2" color="text.secondary">Jun 23, 2025 - Jun 28, 2025</Typography>
      <Box mt={1} display="flex" alignItems="center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
}
export default DateSection;
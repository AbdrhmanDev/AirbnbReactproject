import { Box, Typography, Grid } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import WeekendIcon from '@mui/icons-material/Weekend';
import React from 'react';  

export default function SleepDetails() {
  return (
    <Box p={2}>
      <Typography variant="h6" fontWeight="bold">Where you'll sleep</Typography>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center" gap={1}>
            <BedIcon /> <Typography>Bedroom area</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center" gap={1}>
            <WeekendIcon /> <Typography>Living area</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

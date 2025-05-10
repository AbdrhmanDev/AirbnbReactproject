import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import PetsIcon from '@mui/icons-material/Pets';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

function Amenities() {
    return (
      <Box mt={2}>
        <Typography variant="subtitle1">What this place offers</Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          <Chip icon={<WifiIcon />} label="Wifi" />
          <Chip icon={<PetsIcon />} label="Pets allowed" />
          <Chip icon={<LocalLaundryServiceIcon />} label="Hair dryer" />
        </Box>
      </Box>
    );
  }
  export default Amenities;
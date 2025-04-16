import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

function ReviewsSection() {
    return (
      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold">★ 4.86 · 469 reviews</Typography>
        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
          <Chip label="Cleanliness 4.6" />
          <Chip label="Accuracy 4.9" />
          <Chip label="Check-in 4.8" />
          <Chip label="Communication 4.9" />
          <Chip label="Location 5.0" />
          <Chip label="Value 4.8" />
        </Box>
        <Box mt={2}>
          <Typography variant="body2" mt={1}>“Joel and his wife are very welcoming and friendly. In the morning they offered us coffee and tea. The most peaceful and beautiful Airbnb!” - Klara</Typography>
        </Box>
      </Box>
    );
  }
  export default ReviewsSection;
  
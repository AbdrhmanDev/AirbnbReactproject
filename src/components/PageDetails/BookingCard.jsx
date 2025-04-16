import { Box, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import React from 'react';

export default function BookingCard() {
  return (
    <Card elevation={3} sx={{ borderRadius: '16px', p: 2, position: 'sticky', top: 20, width: '350px' }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">€360 <Typography component="span" variant="body2">for 5 nights</Typography></Typography>
        <Box mt={2}>
          <Typography variant="body1" fontWeight="bold">Check-in / Check-out</Typography>
          <Box display="flex" gap={1} mt={1}>
            <TextField size="small" type="date" fullWidth />
            <TextField size="small" type="date" fullWidth />
          </Box>

          <Typography variant="body1" fontWeight="bold" mt={2}>Guests</Typography>
          <TextField size="small" type="number" defaultValue={1} fullWidth />
        </Box>

        <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              background: '#FF385C',
              '&:hover': { background: '#E61E4D' },
              borderRadius: '12px'
            }}
          >
            Reserve
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

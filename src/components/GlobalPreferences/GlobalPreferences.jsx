import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationPopup from '../NotificationPopup/NotificationPopup';

const preferences = [
  {
    title: 'Preferred language',
    value: 'English',
  },
  {
    title: 'Preferred currency',
    value: 'Euro',
  },
  {
    title: 'Time zone',
    value: '',
  },
];

const GlobalPreferences = () => {
  const [open, setOpen] = useState(false);  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        p: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        {/* Breadcrumb */}
        <Typography variant="body2" color="text.secondary" mb={2}>
          Account &gt; Global preferences
        </Typography>

        {/* Page Title */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Global preferences
        </Typography>

        <Grid container spacing={10}>
          {/* Left Side */}
          <Grid item xs={12} md={9}>
            {preferences.map((item, idx) => (
              <Box key={idx} mb={4} width={"700px"}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.title}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {item.value || '—'}
                  </Typography>
                  <Button size="small" variant='text' onClick={() => setOpen(true)}>
                  Edit
                  </Button>
                  <NotificationPopup open={open} onClose={() => setOpen(false)} />


                </Box>

                {idx < preferences.length - 1 && <Divider sx={{ mt: 3 }} />}
              </Box>
            ))}
          </Grid>

          {/* Right Side*/}
          <Grid item xs={12} md={3}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                maxWidth: 280,
                ml: 'auto',
                borderRadius: 3,
                boxShadow: 1,
              }}
            >
              <CardContent>
                <TuneIcon sx={{ fontSize: 30, mb: 1 }} color="action" />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Your global preferences
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Changing your currency updates how you see prices. You can change how you get paid in your payments & payouts preferences.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default GlobalPreferences;

import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';

const steps = [
  {
    imageUrl: 'https://a0.muscache.com/im/pictures/canvas/Canvas-1728068841874/original/bc0c22ea-ce49-4eae-a885-fa23c1fdfc39.png?im_w=720',
    title: 'Set up your listing',
    description: 'Take photos, set prices, and create an arrival guide',
  },
  {
    imageUrl: 'https://a0.muscache.com/im/pictures/canvas/Canvas-1728068863717/original/454fad80-640e-48ef-8c22-6bef2a572d8e.png?im_w=720',
    title: 'Get your home ready',
    description: 'Prepare, clean, and maintain your home',
  },
  {
    imageUrl: 'https://a0.muscache.com/im/pictures/canvas/Canvas-1728068884725/original/cc2d3fda-9367-49a2-b90e-9e9c446362b5.png?im_w=720',
    title: 'Manage your reservations',
    description: 'Stay on top of your bookings and guest messages',
  },
  {
    imageUrl: 'https://a0.muscache.com/im/pictures/canvas/Canvas-1728068907076/original/b85b277d-1449-4aa1-8306-921366fcd49a.png?im_w=720',
    title: 'Assist your guests',
    description: 'Handle check-ins, checkouts, and onsite requests',
  },
];

const CoHostStepsSection = () => {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        sx={{ m: 7 }}
      >
        Co-hosts can do it all
      </Typography>

      {/* Top Two Steps */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4,
        }}
      >
        {steps.slice(0, 2).map((step, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}
          >
            <img
              src={step.imageUrl}
              alt={step.title}
              style={{ width: '130px', height: '130px', objectFit: 'cover' }}
            />
            <Box>
              <Typography fontWeight="bold" fontSize="1.3rem">
                {step.title}
              </Typography>
              <Typography color="text.secondary" variant="body1" sx={{ fontSize: '1.3rem' }}>
                {step.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 4 }} />

      {/* Bottom Two Steps */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4,
          mb: 5,
        }}
      >
        {steps.slice(2).map((step, index) => (
          <Box
            key={index + 2}
            sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}
          >
            <img
              src={step.imageUrl}
              alt={step.title}
              style={{ width: '130px', height: '130px', objectFit: 'cover' }}
            />
            <Box>
              <Typography fontWeight="bold" fontSize="1.3rem">
                {step.title}
              </Typography>
              <Typography color="text.secondary" variant="body1" sx={{ fontSize: '1.3rem' }}>
                {step.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Button */}
      <Box textAlign="center">
        <Button
          
          sx={{
            backgroundColor: '#222026',
            color: '#fff',
            '&:hover': { backgroundColor: '#000' },
            padding: '15px 70px',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: '50px',
          }}
        >
          Find a co-host
        </Button>
      </Box>
    </Box>
  );
};

export default CoHostStepsSection;

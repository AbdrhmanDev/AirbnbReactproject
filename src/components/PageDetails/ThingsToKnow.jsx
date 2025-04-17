import React from 'react';
import { Box, Typography, Grid, Link, Divider } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Section = ({ title, items }) => (
  <Box>
    <Typography fontWeight="bold" mb={1}>
      {title}
    </Typography>
    {items.map((item, index) => (
      <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
        {item}
      </Typography>
    ))}
    <Link
      href="#"
      underline="hover"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        mt: 1,
        color: 'black', // Make "Show more" text black
        fontWeight: 500,
      }}
    >
      Show more <ArrowForwardIosIcon sx={{ fontSize: 14, ml: 0.5 }} />
    </Link>
  </Box>
);

const VerticalDivider = () => (
  <Box
    sx={{
      width: '1px',
      backgroundColor: '#ddd',
      mx: 2,
      display: { xs: 'none', md: 'block' }, // Hide on mobile
    }}
  />
);

const ThingsToKnow = () => {
  return (
    <Box sx={{ mt: 5, px: 2 }}>
      <Divider sx={{ mb: 4, borderColor: '#ddd' }} />

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Things to know
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
        }}
      >
        <Box flex={1}>
          <Section
            title="House rules"
            items={['Check-in: 3:00PM - 8:00PM', '8 guests maximum', 'Pets allowed']}
          />
        </Box>

        <VerticalDivider />

        <Box flex={1}>
          <Section
            title="Safety & property"
            items={[
              'Pool/hot tub without a gate or lock',
              'Nearby lake, river, other body of water',
              'Carbon monoxide alarm',
            ]}
          />
        </Box>

        <VerticalDivider />

        <Box flex={1}>
          <Section
            title="Cancellation policy"
            items={[
              'Free cancellation before Jun 2. Cancel before Jun 25 for a partial refund.',
              "Review this Host's full policy for details.",
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ThingsToKnow;

import React from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';

const ProtectionSection = () => {
  const protections = [
    'Up to $3M damage protection',
    'Up to $1M liability insurance',
    '24-hour safety line',
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 10, textAlign: 'center' }}>
      {/* Image */}
      <img
        src="https://a0.muscache.com/im/pictures/canvas/Canvas-1727218100752/original/32ac40bb-cf46-4994-9083-f6f0810d401e.png?im_w=720"
        alt="Protection"
        style={{ width: '200px', height: 'auto', margin: '0 auto' }}
      />

      {/* Title */}
      <Typography
        variant="h1"
        fontWeight="bold"
        sx={{ mt: 4, whiteSpace: 'pre-line', fontSize: '4rem' }}
      >
        {"However you host,\nyou’re protected"}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2, fontSize: '1.5rem', whiteSpace: 'pre-line' }}
      >
        {"Top-to-bottom protection, included every time\nyou host your home on Airbnb."}
      </Typography>

      {/* Protection List */}
      <Box sx={{ mt: 5 }}>
        {protections.map((item, index) => (
          <React.Fragment key={index}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1,
              }}
            >
              <Typography fontWeight="medium" fontSize="1.3rem" textAlign="left">
                {item}
              </Typography>
              <Typography sx={{ color: 'green', fontSize: '1.5rem' }}>
                ✓
              </Typography>
            </Box>
            {index < protections.length - 1 && (
              <Divider sx={{ my: 1.5, borderColor: '#666', borderBottomWidth: 2 }} />
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Button */}
      <Box sx={{ mt: 5 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#222026',
            color: '#fff',
            borderRadius: '30px',
            px: 7,
            py: 2,
            mb:5,
            fontWeight: 'bold',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#000',
            },
          }}
        >
          Learn about AirCover
        </Button>
      </Box>

      {/* Small Disclaimer */}
      <Typography
  variant="body2"
  color="text.secondary"
  sx={{
    mt: 2.5,
    fontSize: '1rem',
    maxWidth: 650,
    whiteSpace: 'pre-line',
  }}
>
  {"Host Damage Protection reimburses for certain guest damages during Airbnb stays.\nIt’s not insurance and may apply if guests don’t pay."}
</Typography>


    </Box>
  );
};

export default ProtectionSection;

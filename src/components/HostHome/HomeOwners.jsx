import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const HomeOwners = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 5 }}>
      {/* Section Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center', 
          gap: 2,
        }}
      >
        {/* Image */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-start', 
            marginRight: 2,
          }}
        >
          <img
            src="https://a0.muscache.com/im/pictures/canvas/Canvas-1727390461611/original/1b918373-2070-41bd-a428-f8f96279f3a9.jpeg?im_w=960"
            alt="Hosting"
            style={{
              width: '80%', 
              height: 'auto',
              borderRadius: '10px',
              objectFit: 'cover',
              display: 'block', 
            }}
          />
        </Box>

        {/* Text Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              textAlign: 'left',
              marginBottom: 1, 
            }}
          >
            Hosting isn’t only for homeowners
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textAlign: 'left',
              marginBottom: 2,
                fontSize: '1.2rem', 
            }}
          >
            Airbnb-friendly apartments make it easy for you to
            rent, host, and earn extra income when you’re away.
          </Typography>
          
          {/* Learn More Link */}
          <Typography
            variant="body1"
            sx={{
              color: '#222026',
              textDecoration: 'underline',
              cursor: 'pointer',
              marginTop: 0,
              fontSize: '1.2rem',
            }}
          >
            Learn more
          </Typography>
        </Box>
      </Box>

      {/* Divider After Section */}
      <Divider sx={{ my: 8, borderColor: '#ccc', borderBottomWidth: 2 }} />
    </Box>
  );
};

export default HomeOwners;

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import MailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import LockIcon from '@mui/icons-material/Lock';

const TravelForWork = () => {
  const [email, setEmail] = useState('');

  const handleAddEmail = () => {
    console.log("Work email added:", email);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        p: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Account &gt; Travel for work
        </Typography>

        <Typography variant="h4" fontWeight="800" gutterBottom mb={4} color='#484848'>
          Travel for work
        </Typography>

        <Grid container spacing={4}>
          {/* Left side */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight="600" gutterBottom color='#484848'>
              Join Airbnb for Work
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Add your work email to get seamless expensing and exclusive offers on work trips.
            </Typography>

            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
              Work email address
            </Typography>

            <TextField
              fullWidth
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@company.com"
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              disabled={!email.trim()}
              sx={{
                backgroundColor: email.trim() ? '#008489' : '#e0e0e0',
                color: 'white',
                fontWeight: 'bold',
                paddingX:2,
                paddingY:1,
              }}
              onClick={handleAddEmail}
            >
              Add work email
            </Button>
          </Grid>

          {/* Right side */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ p: 2,  maxWidth:350}}>
              <CardContent>
                <Stack spacing={3}>
                  {/* Row 1 */}
                  <Box display="flex"  flexDirection={'column'}>
                    <MailIcon color="error" fontSize="large" sx={{ mr: 2, mt: 0.5 }} />
                    <Box sx={{}}>
                      <Typography fontWeight="bold">
                        Simplified expensing
                      </Typography>
                      <Typography color="text.secondary">
                        We’ll send work trip receipts to your work inbox for easy expensing.
                      </Typography>
                    </Box>
                  </Box>

                  {/* Row 2 */}
                  <Box display="flex"  flexDirection={'column'}>
                    <DescriptionIcon color="error" fontSize="large" sx={{ mr: 2, mt: 0.5 }} />
                    <Box sx={{mt:1}}>
                      <Typography fontWeight="700">
                        Trip description
                      </Typography>
                      <Typography color="text.secondary">
                        Add an expense code and business purpose to work trips.
                      </Typography>
                    </Box>
                  </Box>

                  {/* Row 3 */}
                  <Box display="flex" flexDirection={'column'}>
                    <LockIcon color="error" fontSize="large" sx={{ mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography fontWeight="bold">
                        Keep personal trips private
                      </Typography>
                      <Typography color="text.secondary">
                        Your company can only get info about trips you mark for work at checkout.
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TravelForWork;

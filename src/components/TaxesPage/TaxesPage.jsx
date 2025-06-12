import React, { useState } from 'react';
import {
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Tabs,
  Tab,
  Stack,
  Button,
  Divider
} from '@mui/material';

const TaxesPage = () => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => setTab(newValue);

  const renderSection = (title, description, buttonLabel, buttonLink = '#') => (
    <Box sx={{ mb: 4 }}>
      <Typography fontSize={18} fontWeight={600} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {description}
      </Typography>
      {buttonLabel && (
        <Button
          variant="contained"
          href={buttonLink}
          sx={{
            bgcolor: 'black',
            '&:hover': { bgcolor: 'grey.900' },
            textTransform: 'none'
          }}
        >
          {buttonLabel}
        </Button>
      )}
      <Divider sx={{ mt: 3 }} />
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/account">
          Account
        </Link>
        <Typography color="text.primary">Taxes</Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Typography variant="h5" gutterBottom>
        Taxes
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="fullWidth"
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          mb: 3,
          bgcolor: 'white',
          color: 'black',
          borderRadius: 1,
          '& .MuiTabs-indicator': { backgroundColor: 'black' }
        }}
      >
        <Tab label="Taxpayers" />
        <Tab label="Tax documents" />
      </Tabs>

      {/* Tab content */}
      {tab === 0 && (
        <Stack spacing={4}>
          {renderSection(
            'Taxpayer information',
            'Tax info is required for most countries/regions.',
            'Add tax info'
          )}
          {renderSection(
            'Value Added Tax (VAT)',
            'If you are VAT-registered, please add your VAT ID.',
            'Add VAT ID Number'
          )}
          <Box>
          <Typography fontSize={18} fontWeight={600} gutterBottom>
    Need help?
  </Typography>
            <Typography variant="body2">
              Get answers to questions about taxes in our{' '}
              <Link href="#" underline="hover">
                Help Center
              </Link>
              .
            </Typography>
          </Box>
        </Stack>
      )}

      {tab === 1 && (
        <Box>
          <Typography variant="body2">
            You have no tax documents at the moment.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default TaxesPage;

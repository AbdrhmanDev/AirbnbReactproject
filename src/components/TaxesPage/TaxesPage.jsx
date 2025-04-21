import React from 'react';
import {
  Breadcrumbs,
  Link,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  Container,
  Stack
} from '@mui/material';

const TaxesPage = () => {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, bgcolor: 'white', color: 'black' }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, bgcolor: 'white', px: 2, py: 1, borderRadius: 1 }}>
        <Link color="inherit" href="/account" underline="hover" sx={{ color: 'black' }}>
          Account
        </Link>
        <Typography color="black">Taxes</Typography>
      </Breadcrumbs>

      <Typography variant="h4" gutterBottom>
        Taxes
      </Typography>

      <Tabs
        value={tab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        sx={{ mb: 3, bgcolor: 'white', color: 'black', borderRadius: 1, '& .MuiTabs-indicator': { backgroundColor: 'black' } }}
      >
        <Tab label="Taxpayers" sx={{ color: 'black' }} />
        <Tab label="Tax documents" sx={{ color: 'black' }} />
      </Tabs>

      {tab === 0 && (
        <Stack spacing={4}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Taxpayer information
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Tax info is required for most countries/regions.{' '}
              <Link href="#" underline="" color='black'>
                Learn more
              </Link>
            </Typography>
            <Button
              variant="contained"
              sx={{ width: { xs: '100%', sm: 'auto' }, bgcolor: 'black', '&:hover': { bgcolor: 'grey.900' } }}
            >
              Add tax info
            </Button>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Value Added Tax (VAT)
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              If you are VAT-registered, please add your VAT ID.{' '}
              <Link href="#" underline="" color='black'>
                Learn more
              </Link>
            </Typography>
            <Button
              variant="contained"
              sx={{ width: { xs: '100%', sm: 'auto' }, bgcolor: 'black', '&:hover': { bgcolor: 'grey.900' } }}
            >
              Add VAT ID Number
            </Button>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Need help?
            </Typography>
            <Typography variant="body2">
              Get answers to questions about taxes in our{' '}
              <Link href="#" underline="" color='black'>
                Help Center
              </Link>.
            </Typography>
          </Box>
        </Stack>
      )}

      {tab === 1 && (
        <Box>
          <Typography variant="body1">
            You have no tax documents at the moment.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default TaxesPage;
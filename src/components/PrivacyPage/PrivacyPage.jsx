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
  Switch,
  Divider,
 
} from '@mui/material';
import DataPrivacy from './DataPrivacy'; 

// Reusable SharingOption component
const SharingOption = ({ title, description, value, onChange }) => (
  <Box sx={{ mb: 3 }}>
    <Typography fontSize={18} fontWeight={600} gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {description}
    </Typography>
    <Switch checked={value} onChange={onChange} />
    <Divider sx={{ mt: 2 }} />
  </Box>
);

// Reusable DataOption component
const DataOption = ({ title, description, value, onChange }) => (
  <Box sx={{ mb: 3 }}>
    <Typography fontSize={18} fontWeight={600} gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {description}
    </Typography>
    <Switch checked={value} onChange={onChange} />
    <Divider sx={{ mt: 2 }} />
  </Box>
);

const PrivacyPage = () => {
  const [tab, setTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleTabChange = (event, newValue) => setTab(newValue);

  // Sharing settings state
  const [sharingSettings, setSharingSettings] = useState({
    readReceipts: true,
    includeInSearch: true,
    showCityCountry: false,
    showTripType: false,
    showLengthOfStay: false,
  });

  // Data privacy settings state
  const [dataSettings, setDataSettings] = useState({
    personalizedAds: true,
    marketingEmails: true,
    thirdPartySharing: false,
    activityTracking: true,
  });

  // Services settings state
  const [servicesSettings, setServicesSettings] = useState({
    partnerServices: true,
    productSuggestions: false,
  });

  const handleSharingToggle = (key) => () => {
    setSharingSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDataToggle = (key) => () => {
    setDataSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleServicesToggle = (key) => () => {
    setServicesSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log('Saved settings:', {
      sharingSettings,
      dataSettings,
      servicesSettings,
    });
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" href="/account">
          Account
        </Link>
        <Typography color="text.primary">Privacy & sharing</Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Typography variant="h3" gutterBottom>
        Privacy and sharing
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
          '& .MuiTabs-indicator': { backgroundColor: 'black' },
        }}
      >
        <Tab label="Data privacy" />
        <Tab label="Sharing" />
        <Tab label="Services" />
      </Tabs>

      {/* Tab content */}
      {tab === 0 && (
 <DataPrivacy/>

)}



      {tab === 1 && (
      <Box>
          <Typography fontWeight={600} sx={{ mt: 2, mb: 2 }}>
            Activity sharing
          </Typography>
          <Stack spacing={2}>
            <SharingOption
              title="Read Receipts"
              description="Show people that you’ve read their messages."
              value={sharingSettings.readReceipts}
              onChange={handleSharingToggle('readReceipts')}
            />
            <SharingOption
              title="Include my listings in search engines"
              description="Allow search engines like Google to display your listing pages."
              value={sharingSettings.includeInSearch}
              onChange={handleSharingToggle('includeInSearch')}
            />
          </Stack>

          <Typography fontWeight={600} sx={{ mt: 4, mb: 2 }}>
            Reviews
          </Typography>
          <Stack spacing={2}>
            <SharingOption
              title="Show my home city and country"
              description="Include your home city and country with your reviews."
              value={sharingSettings.showCityCountry}
              onChange={handleSharingToggle('showCityCountry')}
            />
            <SharingOption
              title="Show my trip type"
              description="Include the type of trip you took with your review."
              value={sharingSettings.showTripType}
              onChange={handleSharingToggle('showTripType')}
            />
            <SharingOption
              title="Show my length of stay"
              description="Include the approximate length of your stay with your review."
              value={sharingSettings.showLengthOfStay}
              onChange={handleSharingToggle('showLengthOfStay')}
            />
          </Stack>
        </Box>
      )}

      {tab === 2 && (
        <Box>
          <Typography fontWeight={600} sx={{ mt: 2, mb: 2 }}>
            Connected services
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2">
              View services that you’ve connected to your Airbnb account.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              No services connected at the moment.
            </Typography>
            <Divider sx={{ mt: 2 }} />
          </Box>

        
        </Box>
      )}
    </Container>
  );
};

export default PrivacyPage;

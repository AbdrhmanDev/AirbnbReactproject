import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';

const DataPrivacy = () => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const handleConfirmDelete = () => {
    // Call your delete account function here
    alert('Account deleted! (simulation)');
    setOpen(false);
  };
// Data privacy settings state
const [dataSettings, setDataSettings] = useState({
    personalizedAds: true,
    marketingEmails: true,
    thirdPartySharing: false,
    activityTracking: true,
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Manage your account data
      </Typography>

      {/* Request data */}
      <Box sx={{ py: 2 }}>
        <Typography fontSize={16} fontWeight={500} gutterBottom>
          Request your personal data
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          We’ll create a file for you to download your personal data.
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: 'black',
            color: 'black',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: 'grey.100',
              borderColor: 'black',
            },
          }}
        >
          Request data
        </Button>
      </Box>

      {/* Delete account */}
      <Box sx={{ py: 2 }}>
        <Typography fontSize={16} fontWeight={500} gutterBottom>
          Delete your account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          This will permanently delete your account and your data, in accordance with applicable law.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleOpenDialog}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
        >
          Delete account
        </Button>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Delete your account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete your account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataPrivacy;

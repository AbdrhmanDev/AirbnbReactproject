import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Switch,
  Stack,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NotificationPopup = ({ open, onClose }) => {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(true);
  const [browser, setBrowser] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          maxWidth: 400,
          width: '90%',
          p: 2,
        },
      }}
    >
      <DialogContent>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Inspiration and offers
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Inspiring stays, experiences, and deals.
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack spacing={3} mt={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>Email</Typography>
            <Switch checked={email} onChange={() => setEmail(!email)}  />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>SMS</Typography>
            <Switch checked={sms} onChange={() => setSms(!sms)} />
          </Box>

          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>Browser notifications</Typography>
              <Switch checked={browser} onChange={() => setBrowser(!browser)} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Push notifications are off. To enable this feature, turn on notifications.
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationPopup;
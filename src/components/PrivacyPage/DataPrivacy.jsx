import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const DataPrivacy = () => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" fontWeight={600} gutterBottom>
      Manage your account data
    </Typography>

    <Box sx={{ py: 2 }}>
      <Typography fontSize={16} fontWeight={500} gutterBottom>
        Request your personal data
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        We’ll create a file for you to download your personal data.
      </Typography>
      {/* <Link to="/RequestData" style={{ textDecoration: 'none' }}> */}
        <Button variant="outlined" sx={{ borderColor: 'black', color: 'black', textTransform: 'none', fontWeight: 500, '&:hover': { bgcolor: 'grey.100', borderColor: 'black' } }}>
          Request data
        </Button>
      {/* </Link> */}
    </Box>

    <Box sx={{ py: 2 }}>
      <Typography fontSize={16} fontWeight={500} gutterBottom>
        Delete your account
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        This will permanently delete your account and your data, in accordance with applicable law.
      </Typography>
      {/* <Link to="/delete" style={{ textDecoration: 'none' }}> */}
        <Button variant="outlined" color="error" sx={{ textTransform: 'none', fontWeight: 500, '&:hover': { bgcolor: 'grey.100' } }}>
          Delete account
        </Button>
      {/* </Link> */}
    </Box>
  </Box>
);

export default DataPrivacy;
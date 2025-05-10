import { Avatar, Box, Typography } from '@mui/material';


export default function HostInfo() {
  return (
    <Box display="flex" alignItems="center" p={2}>
      <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" sx={{ width: 56, height: 56 }} />
      <Box ml={2}>
        <Typography fontWeight="bold">Hosted by Joel</Typography>
        <Typography fontSize="14px">Superhost · 6 years hosting</Typography>
      </Box>
    </Box>
  );
}

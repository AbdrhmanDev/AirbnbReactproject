import { Box, Typography, Link } from '@mui/material';

export default function AboutPlace() {
  return (
    <Box p={2}>
      <Typography variant="h6" fontWeight="bold">About this place</Typography>
      <Typography mt={1}>
        Al quedarte en nuestra estancia vivirás la experiencia de pernoctar en un peculiar pueblo enclavado...
      </Typography>
    </Box>
  );
}

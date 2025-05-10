import { Typography, Link, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';


export default function PropertyDetails() {
  return (
    <Box>
    <Typography variant="h6" fontWeight="bold">Room in Santa Cruz de Tenerife, Spain</Typography>
    <Typography variant="body1" color="text.secondary">2 queen beds · Shared bathroom</Typography>
    <Box display="flex" alignItems="center" mt={1}>
      <StarIcon sx={{ fontSize: 22, color: 'orange', mr: 0.5 }} />
      <Typography variant="body2">4.86 · 469 reviews</Typography>
    </Box>
  </Box>
  );
}

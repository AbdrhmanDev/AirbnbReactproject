import React from 'react';
import { Box, Typography, Avatar, Link, useMediaQuery } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

const reviews = [
  {
    name: 'Michael',
    location: '',
    yearsOnAirbnb: '2 years on Airbnb',
    date: 'July 2024',
    stayType: 'Stayed about a week',
    review:
      'Unsere Familie und Hund waren sehr glücklich auf der Insel. Am liebsten sogar für längere Zeit, perfekt zum Abschalten und Natur genießen. Wir haben alles genutzt und waren oft …',
    avatarUrl: 'https://via.placeholder.com/48x48?text=M',
  },
  {
    name: 'Patricia',
    location: 'Basel, Switzerland',
    yearsOnAirbnb: '',
    date: 'July 2024',
    stayType: 'Group trip',
    review:
      'We loved our stay on the beautiful little paradise island. We were five friends and stayed for four nights. We did not want to leave because we enjoyed it so much. There is lot to do o…',
    avatarUrl: 'https://via.placeholder.com/48x48?text=P',
  },
];

const ReviewCard = ({ review }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
      width: '100%',
    }}
  >
    {/* Header */}
    <Box display="flex" alignItems="center" gap={2}>
      <Avatar src={review.avatarUrl} />
      <Box>
        <Typography fontWeight="bold">{review.name}</Typography>
        {review.yearsOnAirbnb && (
          <Typography variant="body2" color="text.secondary">
            {review.yearsOnAirbnb}
          </Typography>
        )}
        {review.location && (
          <Typography variant="body2" color="text.secondary">
            {review.location}
          </Typography>
        )}
      </Box>
    </Box>

    {/* Rating and Date */}
    <Box display="flex" alignItems="center" gap={1}>
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} sx={{ fontSize: 16 }} />
      ))}
      <Typography fontWeight="bold" fontSize="0.9rem">
        {review.date}
      </Typography>
      <Typography fontSize="0.9rem" color="text.secondary">
        • {review.stayType}
      </Typography>
    </Box>

    {/* Review Text */}
    <Typography>{review.review}</Typography>
    <Link href="#" underline="hover" fontWeight="bold">
      Show more
    </Link>
  </Box>
);

export default function ReviewsRow() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Divider />
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        gap={4}
        sx={{ width: '100%', mt: 2 }}
      >
        {reviews.map((review, index) => (
          <Box key={index} flex={1}>
            <ReviewCard review={review} />
          </Box>
        ))}
      </Box>
    </>
  );
}

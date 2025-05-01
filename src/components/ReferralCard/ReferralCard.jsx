import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Box,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ReferralCard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight={600} color='#484848' gutterBottom>
        Guest referrals
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        {/* Left Column  */}
       

        <Box flex="2">
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Common questions
          </Typography>
          <Typography variant="body1">
            Check out these answers to common questions and review other program information in the{' '}
            <Link href="#" underline="" color='#484848'>Help Center</Link>.
          </Typography>
        </Box>
        {/* Right Column */}
        <Box flex="2">
          <Accordion  sx={{
    borderBottom: '1px solid #ccc',
    boxShadow: 'none', // remove default shadow
    '&:before': {
      display: 'none', // remove default divider line
    },
  }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={550} fontSize={"1.2rem"}>Is the referral program still open?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontWeight={400}>
              The referrals program is no longer open and no new invites can be sent.
<br/> <br/>

If you were sent a coupon prior to the shutdown of the program, you will be able to use the coupon on any booking made prior to the expiration of the coupon.
<br/>
<br/>

Sender credits will be honored till they expire. For prior referrals, you will receive credit upon completion of successful stay if the coupon is used prior to expiry (credit amount based on offer at the time).              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion  sx={{
    borderBottom: '1px solid #ccc',
    boxShadow: 'none', // remove default shadow
    '&:before': {
      display: 'none', // remove default divider line
    },
  }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600} fontSize={"1.2rem"}>I referred a friend but didn't get travel credit</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              For referrals made after Oct 1, 2020, Airbnb doesn't offer travel credit for referrals.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

      </Box>
    </Container>
  );
};

export default ReferralCard;

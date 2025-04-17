import { Container, Grid, Box } from '@mui/material';
import ImageGallery from './ImageGallery.jsx';
import PropertyDetails from './PropertyDetails.jsx';
import HostInfo from './HostInfo.jsx';
import AboutPlace from './AboutPlace.jsx';
import SleepDetails from './SleepDetails.jsx';
import BookingCard from './BookingCard.jsx';
import TextHeaderDetailsPage from './TextHeaderDetailsPage.jsx';
import DateSection from './DateSection.jsx';
import ReviewsSection from './ReviewsSection.jsx';
import Amenities from './Amenities.jsx';
import ReviewCard from './ReviewCard.jsx';
import WhereYoullBeAndHost from './WhereYoullBeAndHost.jsx';
import ThingsToKnow from './ThingsToKnow.jsx'

function PageDetails() {
  return (
    <Container maxWidth="lg">
      <TextHeaderDetailsPage />
      <ImageGallery />

      <Grid container spacing={3} p={3}>
        <Grid item xs={12} md={8}>
          <PropertyDetails />
          <HostInfo />
          <AboutPlace />
          <SleepDetails />
          <Amenities />
          <DateSection />
          <ReviewsSection />
        </Grid>

        {/* RIGHT BookingCard */}
        <Grid item xs={12} md={4}>
          <Box position="sticky" top={100}>
            <BookingCard />
          </Box>
        </Grid>
      </Grid>
      <ReviewCard />
      <WhereYoullBeAndHost />
      <ThingsToKnow />
    </Container>
  );
}

export default PageDetails;

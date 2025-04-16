import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import DetailsBooking from './DetailsBooking.jsx';
import ImagePar from './ImagePar.jsx';
import TextHeaderDetailsPage from './TextHeaderDetailsPage.jsx';

export default function PageDetails() {
    return (
        <div className='all'>
            <Container>
                <TextHeaderDetailsPage />
                <ImagePar />
                <Grid container spacing={4} p={3}>
                    <DetailsBooking />
                </Grid>
            </Container>
        </div>
    )
}

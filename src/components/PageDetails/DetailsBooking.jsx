import { Typography, Box, Chip, Grid, Card, CardContent, Button, Avatar, Link } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import KitchenIcon from '@mui/icons-material/Kitchen';
import TvIcon from '@mui/icons-material/Tv';
import PetsIcon from '@mui/icons-material/Pets';
import StarIcon from '@mui/icons-material/Star';
export default function DetailsBooking() {
    return (
        <>
            <Grid item xs={12} md={8}>
                <Typography variant="h6" fontWeight="bold">Entire rental unit in Hurghada 1, Egypt</Typography>
                <Typography variant="body1" mt={1} color="text.secondary">2 guests · 1 bedroom · 1 bed · 1 bath</Typography>
                <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="body2" ml={1} display="flex" alignItems="center">
                        <StarIcon sx={{ fontSize: 22, color: 'orange', mr: 0.5 }} /> 3.5 ·{' '}
                        <Link href="#reviews" underline="" color="inherit">128 reviews</Link>
                    </Typography>
                </Box>
                <Typography variant="body1" mt={1}>Superhost . 10 years hosting</Typography>

                {/* Amenities */}
                <Box mt={3}>
                    <Typography variant="h6" fontWeight="bold">What this place offers</Typography>
                    <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                        <Chip icon={<WifiIcon />} label="Wi-Fi" variant="outlined" />
                        <Chip icon={<AcUnitIcon />} label="Air Conditioning" variant="outlined" />
                        <Chip icon={<KitchenIcon />} label="Kitchen" variant="outlined" />
                        <Chip icon={<TvIcon />} label="TV" variant="outlined" />
                        <Chip icon={<PetsIcon />} label="Pets Allowed" variant="outlined" />
                    </Box>
                </Box>

                {/* Host Info */}
                <Box mt={4} display="flex" alignItems="center">
                    <Avatar src="https://randomuser.me/api/portraits/women/68.jpg" sx={{ width: 56, height: 56 }} />
                    <Box ml={2}>
                        <Typography variant="h6">Hosted by Sara</Typography>
                        <Typography variant="body2">Superhost . 10 years hosting</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card elevation={3} sx={{ borderRadius: '16px' }}>
                    <CardContent>
                        <Typography variant="h5" fontWeight="bold">$120 <Typography component="span" variant="body2">for 5 nights</Typography></Typography>
                        <Box mt={2}>
                            <Typography variant="body1" fontWeight="bold">Check-in</Typography>
                            <Typography variant="body2" color="text.secondary">Select a date</Typography>
                            <Box display="flex" justifyContent="space-between" mt={1}>
                                <Typography variant="body2">Check-in</Typography>
                                <Typography variant="body2">Check-out</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mt={1}>
                                <Typography variant="body1">Guests</Typography>
                            </Box>
                        </Box>

                        <Box mt={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    background: 'radial-gradient(circle at center, #FF385C 0%, #E61E4D 27.5%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #BD1E59 100%)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'radial-gradient(circle at center, #E61E4D 0%, #D70466 100%)'
                                    }
                                }}
                            >
                                Reserve
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}
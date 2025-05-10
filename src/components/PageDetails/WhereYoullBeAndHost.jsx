import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Link,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
const pinkIcon = new L.Icon({
  iconUrl: 'https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=home|FF5A5F',
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -50],
});

export default function WhereYoullBeAndHost() {
  return (
    <Box sx={{ width: '100%', mt: 5, px: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Where you’ll be & Meet your host
      </Typography>

      <Grid container spacing={4}>
        {/*  Map Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              height: 300,
              borderRadius: 2,
              overflow: 'hidden',
              mb: 2,
            }}
          >
            <MapContainer
              center={[59.1955, 17.6252]}
              zoom={12}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />
              <Marker position={[59.1955, 17.6252]}>
                <Popup>Södertälje, Sweden</Popup>
              </Marker>
            </MapContainer>
          </Box>

          <Typography variant="body2" color="text.primary" sx={{ mt: 2 }}>
            Södertälje, Stockholms län, Sweden
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Mörkö domineras av fritidsboende, men hel del permanentboende finns också här. Främst i
            samhället Söräng på öns östra del. På ön bedrivs också jordbruk. Service finns i
            samhällen som Hölö, Vagnhärad, Trosa och Järna samt relativt nära till Södertälje och
            Nyköping.
          </Typography>
          <Link href="#" underline="hover" sx={{ display: 'inline-block', mt: 1 }}>
            Show more
          </Link>
        </Grid>

        {/* MEET YOUR HOST */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Meet your host
          </Typography>

          <Grid container spacing={4}>
            {/* Host Profile */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Avatar
                  src="https://via.placeholder.com/72x72?text=T"
                  sx={{ width: 72, height: 72 }}
                />
                <Typography fontWeight="bold" fontSize="1.2rem">
                  Tomas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Host
                </Typography>
                <Box display="flex" gap={1} mt={1}>
                  <Box textAlign="center">
                    <Typography fontWeight="bold">322</Typography>
                    <Typography variant="caption">Reviews</Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography display="flex" alignItems="center" fontWeight="bold">
                      4.73 <StarIcon sx={{ fontSize: 16, ml: 0.3 }} />
                    </Typography>
                    <Typography variant="caption">Rating</Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography fontWeight="bold">12</Typography>
                    <Typography variant="caption">Years hosting</Typography>
                  </Box>
                </Box>
                <FavoriteIcon color="error" fontSize="small" />
              </Paper>
            </Grid>

            {/* Host Info */}
            <Grid item xs={12} md={8}>
              <Typography variant="body2" mb={2}>
                <strong>Host details</strong>
                <br />
                Response rate: 100%
                <br />
                Responds within an hour
              </Typography>
              <Button variant="contained" sx={{ mb: 2 }}>
                Message host
              </Button>
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 3 }}>
                To help protect your payment, always use Airbnb to send money and communicate with hosts.
              </Typography>

              <Typography variant="body2" gutterBottom>
                <strong>My work:</strong> Stockholm Smart Stay
                <br />
                Speaks Czech, English, and Swedish
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Welcome to our hotel and house in Stockholm. We will do our best to make you feel at home.
              </Typography>

              <Link href="#" underline="hover" sx={{ display: 'inline-block', mt: 1 }}>
                Show more
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

import React from "react";
import { Box, Container, Typography, Grid, Link } from "@mui/material";

const videos = [
  "https://stream.media.muscache.com/dKZ02Kegi3Ip8K5wbaMHdQbNPN01OTbLcCxhj2tXiiXvw.mp4?v_q=high",
  "https://stream.media.muscache.com/VEAwNHCSPZGuJBtUDNaO5zrXt413Vmap1RB7ICKAgEE.mp4?v_q=high",
  "https://stream.media.muscache.com/cld02CThFwZ024C7veQ01Ns1tuIgrxwS01RiZzJ00B6NHPIs.mp4?v_q=high",
  "https://stream.media.muscache.com/Hj36haiI4IbYNq2K02VTKQzn02E8xAS5ApVpG4H8dTrzc.mp4?v_q=high",
  "https://stream.media.muscache.com/9SK8y1ILEuOV0202zENbFoEWNZJnOIi7JKnxZc7soXRig.mp4?v_q=high",
  "https://stream.media.muscache.com/cp02n9s4vqs00AHpu6TU00F01Aljgh4NXytm7mpGOBI2TCQ.mp4?v_q=high",
  "https://stream.media.muscache.com/Nu8UQRKvUe2vBIR6HvOkfnqICtBiWsEBEs28J0035Xek.mp4?v_q=high",
  "https://stream.media.muscache.com/00NUWNZlgMbHhv55bDllGXcg2WZlQVqGS02lrt9Z3XBpk.mp4?v_q=high",
  "https://stream.media.muscache.com/Ewu4XFp01IE029j02StpWHVKAWrXCRg8YyvD00EJ0002MbNhQ.mp4?v_q=high",
  "https://stream.media.muscache.com/AC1nglJqMoJDPvX2N01G8AfusWgwNnny01gUzxXk3T01fk.mp4?v_q=high",
  "https://stream.media.muscache.com/1TYkvpzD7k5lSTDRnxdpRsbyINlLF00ASlVeTlzHEtRs.mp4?v_q=high",
  "https://stream.media.muscache.com/uE02h8HF1502wxWefmrCQFSSZCIeE6L2uylaQeJs5hs1A.mp4?v_q=high",
];

const GivingVideos = () => {
  return (
    <>
      <Box mt={8}>
        <Container maxWidth="md" sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h4" fontWeight="bold" color="#2b2025" gutterBottom>
            You give. They go.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, fontSize: "1.2rem" }}>
            Bring the world of Airbnb to friends and family. Celebrate holidays, recognize important
            moments, and inspire travel. Help them go wherever, whenever, since they never expire.
          </Typography>
          <Typography sx={{ mt: 4, fontSize: "1.1rem" }}>Purchasing for business?</Typography>
          <Link href="#" color="#000" fontSize="1.1rem">
            Buy gift cards in bulk
          </Link>
        </Container>

        <Container>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 5, mt: 10 }}
          >
            Pick your design
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {videos.map((src, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Box
                  component="video"
                  src={src}
                  muted
                  loop
                  sx={{
                    width: "100%",
                    height: 220,
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container sx={{ mt: 8 }}>
  <Grid container spacing={4} justifyContent="center">
    {/* Column 1 */}
    <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Inspiring designs
      </Typography>
      <Typography variant="body2">
        Gift cards are customizable with your choice of
        <br />
        design, message, and gift amount
      </Typography>
    </Grid>

    {/* Column 2 */}
    <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Easy to send
      </Typography>
      <Typography variant="body2">
        Arrives within minutes via text or email and we’ll
        <br />
        confirm that it’s been received
      </Typography>
    </Grid>

    {/* Column 3 */}
    <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Never expires
      </Typography>
      <Typography variant="body2">
        Gift credit is available to use whenever they’re
        <br />
        ready to travel
      </Typography>
    </Grid>
  </Grid>
</Container>


      </Box>
    </>
  );
};

export default GivingVideos;

import React, { useState } from "react";
import { Box, Typography, Slider, Link } from "@mui/material";
import MapSelector from "./MapSelector";
import HomeDetailsLabel from "../HostHome/HomeDetailsLabel";
import HomeDetailsModal from "../HostHome/HomdeDetailsModal";

const PER_NIGHT = 32;

export default function NightEarning() {
  const [nights, setNights] = useState(9);
  const [coords, setCoords] = useState([30.0444, 31.2357]);
  const [locationName, setLocationName] = useState("Qena");
  const [modalOpen, setModalOpen] = useState(false);

  const earnings = nights * PER_NIGHT;

  const handleRangeChange = (e, value) => {
    setNights(value);
  };

  const handleLocationChange = (latlng) => {
    setCoords(latlng);
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latlng[0]}&lon=${latlng[1]}&format=json`)
      .then((res) => res.json())
      .then((data) => {
        setLocationName(data.address.city || data.address.town || data.address.village || "Selected area");
      });
  };

  return (
    <Box display="flex" width="100%" gap={4}>
      {/* Left Side */}
      <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="h2" fontWeight="bold" lineHeight={1.2} textAlign={"center"}>
          Your home could
        </Typography>
        <Typography variant="h2" fontWeight="bold" textAlign={"center"} lineHeight={1.2}>
          make € {earnings}
        </Typography>
        <Typography variant="h2" fontWeight="bold" textAlign={"center"} lineHeight={1.2}>
          on Airbnb
        </Typography>

        <Typography mt={1} fontWeight={600} fontSize="1rem" textAlign={"center"}>
          {nights} nights,&nbsp;·&nbsp;€ {PER_NIGHT}/night
        </Typography>

        <Link
          component="button"
          underline="hover"
          sx={{ mt: 1, fontSize: "1rem", color: "gray", textDecoration: "underline" }}
        >
          Learn how we estimate earnings
        </Link>

        <Slider
          min={1}
          max={30}
          value={nights}
          onChange={handleRangeChange}
          sx={{
            mt: 4,
            color: "rgb(227, 28, 94)",
            '& .MuiSlider-thumb': {
              backgroundColor: "#fff",
              border: "2px solid rgb(255, 255, 255)",
              height: 50,
              width: 50,
            },
          }}
        />

        <HomeDetailsLabel locationName={locationName} onClick={() => setModalOpen(true)} />
        <HomeDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} locationName={locationName} />
      </Box>

      {/* Right Side */}
      <Box flex={1}>
        <MapSelector coords={coords} onLocationChange={handleLocationChange} />
      </Box>
    </Box>
  );
}
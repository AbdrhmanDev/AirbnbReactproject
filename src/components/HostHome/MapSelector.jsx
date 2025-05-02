// src/components/MapSelector.jsx
import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

const LocationMarker = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const MapSelector = ({ coords, onLocationChange }) => {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        width: "100%",
        height: "400px",
      }}
    >
      <MapContainer
        center={coords}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <LocationMarker onSelect={onLocationChange} />
      </MapContainer>
    </Box>
  );
};

export default MapSelector;

// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import NightEarning from "./components/HostHome/NightEarning";
import HomeVideo from "./components/HostHome/HomeVideo";
import HomeCohost from "./components/HostHome/HomeCohost";
import CoHosts from "./components//HostHome/Co-hosts";
import AirCover from "./components/HostHome/AirCover";
import AirVidApp from "./components/HostHome/AirVidApp";
import HomeOwners from "./components/HostHome/HomeOwners";
import Questions from "./components/HostHome/Questions";
import GiftPage from "./pages/GiftPage";
import MessagesPage from "./components/Message/MessagesPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Host Home Page*/}
        <Route
          path="/"
          element={
            <>
              <Container maxWidth="lg">
                <Box display="flex" height="100vh" alignItems="center">
                  <NightEarning />
                </Box>
              </Container>
              <HomeVideo />
              <HomeCohost />
              <CoHosts />
              <AirCover />
              <AirVidApp />
              <HomeOwners />
              <Questions />
            </>
          }
        />
        {/* Gift Card Page */}
        <Route path="/gift" element={<GiftPage />} />
  
        {/* Messages Page */}
        <Route path="/messages" element={<MessagesPage />} />
      </Routes>
    </Router>
  );
}  

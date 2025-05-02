import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import listings from "../../data/listings";
import CardItem from "./Card/CardItem";

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
    <Grid container spacing={2}>
      {listings.map((listing) => (
        <Grid item xs={12} sm={6} md={3} key={listing.id}>
  <CardItem listing={listing} />
</Grid>

      ))}
    </Grid>
  </Container>
  
  );
};

export default Home;

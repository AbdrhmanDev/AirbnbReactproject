import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    q: "Are gift cards physical or digital?",
    a: "Gift cards bought on Airbnb.com in the US can be purchased as eGift cards, which are sent via text or email, or physical gift cards that will be shipped to a recipient's US address.",
  },
  {
    q: "Where can I buy a physical gift card?",
    a: "You can order a physical gift card here or buy at participating Target, Walmart, Best Buy, CVS, Walgreens, Kroger, Safeway, and Whole Foods store locations.",
  },
  {
    q: "Do gift cards expire?",
    a: "No, our gift cards don't expire.",
  },
  {
    q: "Where are gift cards available?",
    a: "Airbnb gift cards are available in many countries around the world. You can find the full list of available countries and applicable Gift Card Terms here.",
  },
  {
    q: "Can I send a gift card to someone who lives in a different country?",
    a: "Gift cards purchased in the US can only be redeemed by users who reside in the US. The gift card recipient must also have a valid payment method in the US.",
  },
  {
    q: "How can I check my gift card balance?",
    a: "Once you redeem your card and add the funds from the card to your account, you can go to Payment methods in your Account and check your balance.",
  },
  {
    q: "Which payment methods does Airbnb accept?",
    a: "We currently accept major credit cards and Apple Pay for gift cards purchased on Airbnb.",
  },
];

const BusinessAndFAQSection = () => {
  return (
    <Box mt={10}>
      {/* Business Card Section */}
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          sx={{
            backgroundColor: "#f7f7f7",
            borderRadius: 3,
            px: 3,
            py: 4,
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Text Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold">
              Gift cards
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              for business
            </Typography>
            <Typography fontSize="1.1rem" mt={4}>
              Show your appreciation for <br />
              employees and customers with a gift <br />
              that's easy to give for any occasion.
            </Typography>
            <Typography fontSize="1.1rem" mt={4}>
              For orders $10,000 or more,
            </Typography>
            <Link
              href="#"
              underline="hover"
              fontWeight="bold"
              fontSize="1.1rem"
              sx={{ color: "black" }}
            >
              Contact sales.
            </Link>
            <Box mt={4}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2c2c2c",
                  borderRadius: "30px",
                  px: 4,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "#1a1a1a",
                  },
                }}
              >
                Get started
              </Button>
            </Box>
          </Grid>

          {/* Image Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: 4, md: 0 },
            }}
          >
            <Box
              component="img"
              src="https://a0.muscache.com/im/pictures/canvas/Canvas-1712156201605/original/474b6135-6999-49ec-99c6-c5e59c2d4f2d.png?im_w=1680"
              sx={{
                width: { xs: "100%", md: "80%" },
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Container sx={{ mt: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          {/* Text on the left */}
          <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "50%" } }}>
            <Typography variant="h3" fontWeight="bold">
              Frequently <br /> asked <br /> questions
            </Typography>
            <Typography mt={3}>
              For more questions visit the{" "}
              <Link
                href="#"
                underline="hover"
                sx={{ color: "black", fontWeight: "medium" }}
              >
                Help Center.
              </Link>
            </Typography>
          </Box>

          {/* Accordion on the right */}
          <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: "50%" } }}>
            {faqs.map((item, i) => (
              <Accordion key={i}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ fontSize: "1.1rem" }}
                >
                  {item.q}
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{item.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BusinessAndFAQSection;

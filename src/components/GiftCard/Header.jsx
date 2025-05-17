
import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";

const Header = () => {
  return (
    <>
      {/* Header Section */}
      <Box
        sx={{
          width: "100%",
          py: 6,
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "3rem",
                sm: "5rem",
                md: "8rem",
                lg: "8rem",
              },
              lineHeight: 1,
            }}
          >
            Airbnb
          </Typography>
          <Typography
            variant="h1"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "3rem",
                sm: "5rem",
                md: "8rem",
                lg: "8rem",
              },
              lineHeight: 1,
            }}
          >
            gift cards
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              px: 5,
              py: 2,
              fontSize: "1.2rem",
              borderRadius: "50px",
              fontWeight: 600,
              background: "linear-gradient(to left, #ce0e61, #f42c55)",
            }}
          >
            Buy now
          </Button>
        </Container>
      </Box>

      {/* Images Section */}
      <Box
  sx={{
    position: "relative",
    width: "100%",
    height: { xs: 320, sm: 420, md: 520 },
    mt: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  {/* Background image (Pink) */}
  <Box
    component="img"
    src="https://a0.muscache.com/im/pictures/canvas/Canvas-1711407977510/original/0a5aa85a-9ccb-4798-8b0d-be514b25adbf.jpeg?im_w=2560"
    alt="Pink background"
    sx={{
      position: "absolute",
      width: { xs: "400px", sm: "500px", md: "650px" },  // زيادة الحجم هنا
      height: "auto",
      transform: "rotate(15deg)",  // زيادة الميلان
      opacity: 1,  // الصورة الوردية تظهر بالكامل
      animation: "fadeInPink 1s ease-in-out forwards",
      zIndex: 1,  // الصورة الوردية تحت الصورة الثانية
    }}
  />

  {/* Foreground image (Gift Card) */}
  <Box
    component="img"
    src="https://a0.muscache.com/im/pictures/canvas/Canvas-1714413177938/original/934a5781-8a00-4e03-b00e-de94fa7a5835.png?im_w=2560"
    alt="Gift card image"
    sx={{
      position: "absolute",
      width: { xs: "400px", sm: "500px", md: "650px" },  // زيادة الحجم هنا
      height: "auto",
      transform: "rotate(6deg)", // ميل الصورة الثانية
      opacity: 0,
      animation: "fadeInTop 1s ease-in-out 0.6s forwards",
      zIndex: 2,  // الصورة الثانية فوق الصورة الوردية
    }}
  />
</Box>

      {/* Custom animation keyframes */}
      <style>
        {`
          @keyframes fadeInPink {
            from {
              transform: translateY(150px) rotate(-8deg);
              opacity: 0;
            }
            to {
              transform: translateY(0) rotate(-8deg);
              opacity: 1;
            }
          }

          @keyframes fadeInTop {
            from {
              transform: translateY(150px) rotate(6deg);
              opacity: 0;
            }
            to {
              transform: translateY(0) rotate(6deg);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;

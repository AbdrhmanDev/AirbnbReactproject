import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Accordion, AccordionSummary, AccordionDetails,
} from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  // useEffect(() => {
  //   const onScroll = () => {
  //     setScrolled(window.scrollY > window.innerHeight * 0.4);
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);


useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleToggleVideo = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleToggleShowMore = () => {
     setShowMore((prev) => !prev);
  };

  const gradientTextStyle = {
    background: `linear-gradient(270deg, #F0D735, #ECDC53, #E68027, #52516F, #475772, #1A7380)`,
    backgroundSize: "1200% 1200%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "gradientText 10s ease infinite",
    fontWeight: 700,
    fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3.5rem", lg: "4.7rem" },
    lineHeight: 1.2,
    textAlign: "left",
  };

  
  
  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden" }}>
      {/* Navbar - Sticky Part */}
      <Box
  sx={{
     position: "sticky",
          top: 0,
          width: "100%",
          height: scrolled ? "70px" : "550px",
          backgroundColor: "white",
          zIndex: 1000,
          transition: "height 0.4s ease",
          display: "flex",
          flexDirection: scrolled ? "row" : "column",
          justifyContent: scrolled ? "flex-end" : "center",
          alignItems: scrolled ? "center" : "center",
          px: { xs: 3, md: 6 },
          pt: scrolled ? 0 : 6,
          overflow: "hidden",
  }}
>
  {/* المحتوى الكامل (يظهر فقط عندما لا يكون هناك سكرول) */}
  
  <Box
    sx={{
      width: "100%",
            maxWidth: 1100,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? "translateY(-20px)" : "translateY(0)",
            position: scrolled ? "absolute" : "relative",
            pointerEvents: scrolled ? "none" : "auto",
    }}
  >
    <Typography variant="h6" color="black" fontWeight="bold" sx={{ mb: 2 }}>
      Host an experience on Airbnb
    </Typography>

    <Typography sx={{ ...gradientTextStyle }}>
      <Box component="span" sx={{ whiteSpace: "nowrap", display: "block" }}>
        Earn money leading people on
      </Box>
      <Box component="span" sx={{ display: "block" }}>
        activities you love.
      </Box>
    </Typography>

    <Box sx={{ mt: 4, textAlign: "left" }}>
      <Button
        variant="contained"
        sx={{
          minWidth: "120px",
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                fontWeight: "bold",
                px: 4,
                py: 1.2,
                fontSize: "1rem",
                borderRadius: "30px",
                "&:hover": { backgroundColor: "#2f2d34" },
        }}
        endIcon={<ArrowForwardIcon />}
      >
        Let's go
      </Button>
    </Box>
  </Box>

  {/* الزر المصغر (يظهر فقط عند السكرول) */}
  <Box
    sx={{
      position: "sticky",
          top: 0,
          width: "100%",
          height: "70px",
          backgroundColor: "white",
          zIndex: 1000,
          display: scrolled ? "flex" : "none",
          justifyContent: "flex-end",
          alignItems: "center",
          px: { xs: 3, md: 6 },
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
    }}
  >
    <Button
      variant="contained"
      sx={{
       minWidth: "120px",
            backgroundColor: "black",
            color: "white",
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
            py: 1,
            fontSize: "0.9rem",
            borderRadius: "30px",
            "&:hover": { backgroundColor: "#2f2d34" },
      }}
      endIcon={<ArrowForwardIcon />}
    >
      Let's go
    </Button>
  </Box>
</Box>

      {/* Video Section - Below Navbar */}
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <video
          ref={videoRef}
          src="https://stream.media.muscache.com/GLBXMO7wXoGpGzwi6QBynOiqpPONrVB2RQ5KCFSuIxM.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />

        {/* Fade Overlay at bottom */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "200px",
            background:
              "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6), black)",
            zIndex: 2,
          }}
        />

        {/* Bottom Content inside video */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            zIndex: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 2,
            padding: { xs: 2, md: 4 },
          }}
        >
          {/* Left Text */}
          <Box sx={{ color: "white", maxWidth: "70%" }}>
            <Typography variant="h4" fontWeight="bold">
              What's an experience?
            </Typography>
            <Typography variant="body1" fontWeight={"bold"} sx={{ mt: 1 }}>
              It's an activity that goes beyond the typical tour or class,
              designed and led by locals all over the world. Show off your city,
              craft, cause, or culture by hosting an experience.
            </Typography>
          </Box>

          {/* Play/Pause Button */}
          <IconButton
            onClick={handleToggleVideo}
            sx={{
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "#fff",
              ml: 2,
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          display: "flex",
          flexDirection: { xs: "column", md: "column" },
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 10 },
          textAlign: { xs: "center", md: "left" },
          gap: { xs: 4, md: 4 },
        }}
      >
        {/* First Image and Text */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            mb: 6,
          }}
        >
          {/* Left Image */}
          <Box
            sx={{
              flex: "0 0 auto",
              maxWidth: 400,
              mr: { md: 10 },
              ml: { md: 35 },
            }}
          >
            <Box
              component="img"
              src="https://a0.muscache.com/im/pictures/2bdf020b-303c-46a4-bf2c-6c6a8e775bd8.jpg?aki_policy=x_large"
              alt="Experience"
              sx={{
                width: "100%",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.4)",
              }}
            />
          </Box>

          {/* Right Text */}
          <Box sx={{ flex: 1, ml: { md: 10 }, mr: { md: 35 } }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              Create an
              <br />
              activity, your
              <br />
              way
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem" },
                fontWeight: "bold",
                lineHeight: 1.6,
                maxWidth: 500,
                mb: 4,
                position: "relative",
                left: "90px",
              }}
            >
              Food tour by bike, light photography at night, <br />
              tapas on a boat, or yoga (with goats). Create <br />
              and curate a unique activity people want to <br />
              try.
            </Typography>
          </Box>
        </Box>

        {/* Second Image and Text */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row-reverse" },
            alignItems: "center",
            justifyContent: "center",
            mb: 6,
          }}
        >
          {/* Right Image (Reversed) */}
          <Box
            sx={{
              flex: "0 0 auto",
              maxWidth: 400,
              mr: { md: 10 },
              ml: { md: 35 },
            }}
          >
            <Box
              component="img"
              src="https://a0.muscache.com/im/pictures/55b065f5-e6d9-4a0a-8066-9c1850db7660.jpg?aki_policy=x_large"
              alt="Experience"
              sx={{
                width: "100%",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.4)",
              }}
            />
          </Box>

          {/* Left Text (Reversed) */}
          <Box sx={{ flex: 1, ml: { md: 10 }, mr: { md: 8 } }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              Do what you love
              <br />
              (and get paid)
              <br />
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem" },
                fontWeight: "bold",
                lineHeight: 1.6,
                maxWidth: 500,
                mb: 4,
                position: "relative",
                left: "90px",
              }}
            >
              Scout for street art or surf at sunset, turn <br />
              your passion into profit. Earn money without <br />
              it feeling like a job. <br />
            </Typography>
          </Box>
        </Box>

        {/* Third Image and Text (New Section) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            mb: 6,
          }}
        >
          {/* Left Image (New) */}
          <Box
            sx={{
              flex: "0 0 auto",
              maxWidth: 400,
              mr: { md: 10 },
              ml: { md: 35 },
            }}
          >
            <Box
              component="img"
              src="https://a0.muscache.com/im/pictures/d1d720a0-7253-4f89-b9b4-50759c376a9a.jpg?aki_policy=x_large"
              alt="Experience"
              sx={{
                width: "100%",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.4)",
              }}
            />
          </Box>

          {/* Right Text (New) */}
          <Box sx={{ flex: 1, ml: { md: 10 }, mr: { md: 40 } }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              Get voices for
              <br />
              your cause
              <br />
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.1rem" },
                fontWeight: "bold",
                lineHeight: 1.6,
                maxWidth: 500,
                mb: 4,
                position: "relative",
                left: "90px",
              }}
            >
              Lead a hike with rescue dogs, or teach ethical <br />
              fashion. Raise awareness of your cause in a <br />
              whole new way. <br />
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* New Section - Two Columns */}
      <Box
        sx={{
          backgroundColor: "white",
          py: { xs: 6, md: 10 },
          px: { xs: 3, md: 10 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 5,
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* Left Column - Bold Title */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              textAlign: { xs: "center", md: "left" },
              color: "#484848",
            }}
          >
            Show what you know
          </Typography>
        </Box>

        {/* Right Column - Description */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.6,
              textAlign: { xs: "center", md: "left" },
              color: "#484848",
            }}
          >
            There are experiences of every kind, like cooking, crafting,
            <br />
            kayaking, and more.There’s no limit to what you can do.
            <br />
            Explore these featured categories.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f2f2f2",
          py: { xs: 6, md: 10 },
          px: { xs: 3, md: 10 },
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {/* Card 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, minHeight: "400px" }}>
              <CardMedia
                component="img"
                height="300"
                image="https://a0.muscache.com/im/pictures/36ad251f-02c2-486a-965f-1d473e25e509.jpg?aki_policy=x_large"
                alt="Great for groups"
              />
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#484848" }}
                >
                  Culture & History
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#484848", mt: 1, py: 1, fontSize: "1rem" }}
                >
                  Share the story behind famous <br />
                  landmarks in your city.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="300"
                image="https://a0.muscache.com/im/pictures/eca85a07-8fad-4648-a4a4-b4c9283fdd65.jpg?aki_policy=x_large"
                alt="Fun for kids"
              />
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#484848" }}
                >
                  Food & Drink
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#484848", mt: 1, py: 1, fontSize: "1rem" }}
                >
                  Host a food tour, cooking class, dining <br />
                  experience, and more.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="300"
                image="https://a0.muscache.com/im/pictures/1ecf2c03-5b86-4af3-a194-c18764eafbb3.jpg?aki_policy=x_large"
                alt="Make plans this weekend"
              />
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#484848" }}
                >
                  Nature & Outdoor
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "#484848", mt: 1, py: 1, fontSize: "1rem" }}
                >
                  Lead nature hikes, water sports, <br />
                  mountain activities, and more.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          py: { xs: 6, md: 10 },
          px: { xs: 3, md: 10 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 9,
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* Left Column - Bold Title */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              textAlign: { xs: "center", md: "left" },
              color: "#484848",
            }}
          >
            We’ve got your back, every step of the way
          </Typography>
        </Box>

        {/* Right Column - Description */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.6,
              textAlign: { xs: "center", md: "left" },
              color: "#484848",
            }}
          >
            Resources like articles and insights dedicated to your hosting
            needs, 24/7 customer support for you and your guests, exposure for
            your experience, and much more, to help you grow your business.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f2f2f2",
          py: { xs: 3, md: 5 },
          px: { xs: 3, md: 10 },
          mt: 4,
          maxWidth: "1100px", 
          mx: "auto",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* الصور - بتظهر فوق في الموبايل ويمين في الشاشات الكبيرة */}
          <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
            <Grid container spacing={3}>
              {/* صورة 1 */}
              <Grid item xs={6}>
                <Box textAlign="center">
                  <Card
                    sx={{
                      boxShadow: "0 0.3px 6px #ff5a5f",
                      width: "100px",
                      height: "120px",
                      borderRadius: 4,
                      border: "2px solid #ff5a5f",
                      padding: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="https://a0.muscache.com/airbnb/static/packages/assets/frontend/explore-core/images/icon-uc-alarm.e0a2b02fa7d1e956cd4135847fc0cda1.gif"
                      alt="Tasks"
                      sx={{ width: "100%", borderRadius: 2 }}
                    />
                  </Card>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "#484848", mt: 1 }}
                  >
                    Tasks
                  </Typography>
                </Box>
              </Grid>

              {/* صورة 2 */}
              <Grid item xs={6}>
                <Box textAlign="center">
                  <Card
                    sx={{
                      boxShadow: "0 0.3px 6px #60b6b5",
                      width: "100px",
                      height: "120px",
                      borderRadius: 4,
                      border: "2px solid #60b6b5",
                      padding: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="https://a0.muscache.com/airbnb/static/packages/assets/frontend/explore-core/images/icon-uc-calendar.ace59291b2904181320cb34108a24537.gif"
                      alt="Scheduling"
                      sx={{ width: "100%", borderRadius: 2 }}
                    />
                  </Card>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "#484848", mt: 1 }}
                  >
                    Scheduling
                  </Typography>
                </Box>
              </Grid>

              {/* صورة 3 */}
              <Grid item xs={6}>
                <Box textAlign="center">
                  <Card
                    sx={{
                      boxShadow: "0 0.3px 6px #ffb400",
                      width: "100px",
                      height: "120px",
                      borderRadius: 4,
                      border: "2px solid #ffb400",
                      padding: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="https://a0.muscache.com/airbnb/static/packages/assets/frontend/explore-core/images/icon-uc-money-saved.0d988c4ec128a1a11fdc5c499940dec8.gif"
                      alt="Payments"
                      sx={{ width: "100%", borderRadius: 2 }}
                    />
                  </Card>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "#484848", mt: 1 }}
                  >
                    Payments
                  </Typography>
                </Box>
              </Grid>

              {/* صورة 4 */}
              <Grid item xs={6}>
                <Box textAlign="center">
                  <Card
                    sx={{
                      boxShadow: "0 0.3px 6px #60b6b5",
                      width: "100px",
                      height: "120px",
                      borderRadius: 4,
                      border: "2px solid #60b6b5",
                      padding: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="https://a0.muscache.com/airbnb/static/packages/assets/frontend/explore-core/images/icon-uc-graph.3f8bd411622845e624b9be5ba9631168.gif"
                      alt="Insights"
                      sx={{ width: "100%", borderRadius: 2 }}
                    />
                  </Card>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "#484848", mt: 1 }}
                  >
                    Insights
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* النص - بيظهر تحت في الموبايل وعلى الشمال في الشاشات الكبيرة */}
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.8rem", md: "1.9rem" },
                mb: 2,
                color: "#484848",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Tools tailored to you
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "1rem", md: "1rem" },
                lineHeight: 1.6,
                color: "#484848",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              A dashboard to give you insights, feedback on how to <br />{" "}
              improve, visibility to guests from all over the world through
              <br /> search and filters, seamless payments, and much more.
            </Typography>
          </Grid>
        </Grid>
      </Box>


<Box
  sx={{
    backgroundColor: "#f2f2f2",
    py: { xs: 3, md: 5 },
    px: { xs: 3, md: 10 },
    mt: 3, // المسافة بين السيكشن الحالي والسيكشن الذي فوقه
    maxWidth: "1100px", 
    mx: "auto",
  }}
>
  <Grid container spacing={6} alignItems="center">
    {/* الصورة على اليسار */}
    <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "left" }, display: 'flex', justifyContent: 'flex-start', mr: 4 }}>
      <img
        src="https://a0.muscache.com/im/pictures/28fc92ed-0595-42b6-b332-7ee6fdf55a3e.jpg?im_w=1440"
        alt="AirCover Image"
        style={{
          width: "100%", // تأكد من أن الصورة تأخذ 100% من المساحة المتاحة
          maxWidth: "450px", // يمكنك تحديد أقصى عرض للصورة
          height: "auto",
          borderRadius: "10px",
        }}
      />
    </Grid>

    {/* النص على اليمين */}
    <Grid item xs={12} md={6} sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", md: "1.4rem" },
          mb: 1,
          color: "#484848",
        }}
      >
        AirCover for Hosts
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", md: "1.4rem" },
          mb: 2,
          color: "#484848",
        }}
      >
        covers Experiences, too
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: "1rem", md: "1rem" },
          lineHeight: 1.6,
          color: "#484848",
        }}
      >
        AirCover for Hosts includes $1M in Experiences liability<br/> insurance in the rare event a guest gets hurt during an <br/> Airbnb Experience. Always included and always free.
      </Typography>
    </Grid>
  </Grid>
</Box>

 <Box
        sx={{
          backgroundColor: "white",
          py: { xs: 6, md: 10 },
          px: { xs: 3, md: 10 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 9,
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* Left Column - Bold Title */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              textAlign: { xs: "center", md: "left" },
              color: "#484848",
            }}
          >
            How to get started

          </Typography>
        </Box>

        {/* Right Column - Description */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.6,
              textAlign: { xs: "center", md: "left" },
              color: "#484848",
            }}
          >
           Here’s a quick overview of the process, from start to finish.

          </Typography>
        </Box>
      </Box>

<Box
  sx={{
    py: { xs: 3, md: 5 },
    px: { xs: 3, md: 10 },
    mt: 3, 
    maxWidth: "1100px",
    mx: "auto",
  }}
>
  <Grid container spacing={2} justifyContent="center"> 
    {/* الكرت الأول */}
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          backgroundColor: "#f2f2f2",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          borderRadius: "8px",
          boxShadow: 3,
          position: "relative",
          height: "100%", 
        }}
      >
        {/* الدائرة والرقم داخل الكرت */}
        <Box
          sx={{
            border: "2px solid black",
            color: "black",
            width: 40,
            height: 40,
            borderRadius: "50%", 
            display: "flex",
            alignItems: "left",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
            position: "absolute",
            top: 20,
            left: "calc(50%  20px)", 
            backgroundColor: "#f2f2f2", 
          }}
        >
          1
        </Box>
        {/* محتوى الكرت */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            mb: 2,
            mt: 6,
            color: "#484848",
          }}
        >
          Learn our quality <br /> standards
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            color: "#484848",
            textAlign: "left",
          }}
        >
          Make sure your experience meets<br/> our bar for expertise, insider<br/> access, and connection.
        </Typography>
      </Box>
    </Grid>

    {/* الكرت الثاني */}
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          backgroundColor: "#f2f2f2", 
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          borderRadius: "8px",
          boxShadow: 3 ,
          position: "relative",
          height: "100%", 
        }}
      >
        {/* الدائرة والرقم داخل الكرت */}
        <Box
          sx={{
             border: "2px solid black",
            color: "black",
            width: 40,
            height: 40,
            borderRadius: "50%", 
            display: "flex",
            alignItems: "left",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
            position: "absolute",
            top: 20,
            left: "calc(50%  20px)", 
            backgroundColor: "#f2f2f2", 
          }}
        >
          2
        </Box>
        {/* محتوى الكرت */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            mb: 2,
            mt: 6,
            color: "#484848",
          }}
        >
          Submit your <br/>
          experience
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            color: "#484848",
            textAlign: "left",
          }}
        >
          Share a description and high- <br/>
          quality photos of what you have in <br/>
          mind to show what your experience <br/>
          would be like.
        </Typography>
      </Box>
    </Grid>

    {/* الكرت الثالث */}
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          backgroundColor: "#f2f2f2",
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          borderRadius: "8px",
          boxShadow: 3,
          position: "relative",
          height: "100%", 
        }}
      >
        {/* الدائرة والرقم داخل الكرت */}
        <Box
          sx={{
             border: "2px solid black",
            color: "black",
            width: 40,
            height: 40,
            borderRadius: "50%", 
            display: "flex",
            alignItems: "left",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
            position: "absolute",
            top: 20,
            left: "calc(50%  20px)", 
            backgroundColor: "#f2f2f2", 
          }}
        >
          3
        </Box>
        {/* محتوى الكرت */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            mb: 2,
            mt: 6,
            color: "#484848",
          }}
        >
          Start hosting
         </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            color: "#484848",
            textAlign: "left",
          }}
        >
          Your experience will be reviewed <br/>
          and if it is approved, you can add <br/>
          dates to your calendar and start <br/>
          welcoming guests
        </Typography>
      </Box>
    </Grid>
  </Grid>
</Box>


<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
  <Button
    variant="contained"
    sx={{
      backgroundColor: "black",
      color: "white",
      textTransform: "none",
      fontSize: "1rem",
      px: 4,
      py: 1.5,
      "&:hover": {
        backgroundColor: "#333",
      },
    }}
  >
    Let's go
  </Button>
</Box>




{/* FAQ Section */}
<Box sx={{ mt: 25,pl:35 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold',fontSize:'30px', mb: 5,mt:20, color:'#484848' }}>
        Frequently asked questions
      </Typography>

      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1,color:'#484848'  }}>
          Do I have to host a home to host an experience?
        </Typography>
        <Typography variant="body2" sx={{ pb:3,color:'#484848'  }}>
          No. You don’t have to host guests overnight in your home or space to be an experience host.

        </Typography>

        <hr style={{ border: '1px solid #ddd', width: '70%', margin: '10px 0' }} />

        <Typography variant="body3" sx={{ fontWeight: 'bold', mb: 1,pt:5,color:'#484848'  }}>
          What’s the time commitment?

        </Typography>
        <Typography variant="body2" sx={{ mb: 5 ,color:'#484848' }}>
          You can host as often as you like—feel free to adjust your dates and times until you find what works best for you.

        </Typography>

        <hr style={{ border: '1px solid #ddd', width: '50%', margin: '10px 0' }} />

        <Typography variant="body3" sx={{ fontWeight: 'bold', mb: 1,mt:3,color:'#484848'  }}>
          Do I need a business license?

        </Typography>
        <Typography variant="body2" sx={{ mb: 2 ,color:'#484848' }}>
Depending on activities involved, certain experiences may require a business license. Make sure to check local laws in your area to determine<br/>
which licenses may be required for your experience, especially if there is food, alcohol, or transportation involved.
        </Typography>


        
        <Box sx={{ transition: 'max-height 0.5s ease-in-out', overflow: 'hidden' }}>
          {showMore && (
            
            <>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1,color:'#484848'  }}>
                Can I set a minimum number of guests per experience?

              </Typography>
              <Typography variant="body2" sx={{ mb: 2,color:'#484848'  }}>
               The minimum number of guests you can host during each instance of your experience is 1.
              </Typography>

              <hr style={{ border: '1px solid #ddd', width: '50%', margin: '10px 0' }} />

              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1,color:'#484848'  }}>
                Do I need insurance?

              </Typography>
              <Typography variant="body2" sx={{ mb: 2,color:'#484848'  }}>
                With AirCover for Hosts you get Experiences liability insurance. That coverage applies to you in the rare event a guest is hurt or their<br/>
                property is damaged during a covered Experience.
              </Typography>

            </>
          )}
        </Box>
      </Box>

           {/* {show more  */}
      <Box sx={{ position: 'sticky', mt: 2, mb: 4,padding: 5 }}>
        <Button onClick={handleToggleShowMore} sx={{ textTransform: 'none', border:'solid 1px #1976d2' }}>
          {showMore ? 'Show less' : 'Show more'}
        </Button>
      </Box>
    </Box>
 


      <style>
        {`
          @keyframes gradientText {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default HeroSection;

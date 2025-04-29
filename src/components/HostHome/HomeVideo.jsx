import React from "react";
import { Box, Typography, Divider, Grid, IconButton } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
const NewSection = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* H1 Bold Title */}
      <Typography
  variant="h2"
  fontWeight="bold"
  textAlign="center"
  mb={3}
>
  It’s easy to list your<br />
  home on Airbnb
</Typography>


      {/* Video */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "700px", 
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <video
          src="https://stream.media.muscache.com/CD5EglJ7eTQKOlfQQ2zVDyncLCA2xKL02mu9NsrffhXI.mp4?v_q=high"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Box>


      {/* Divider */}
      <Divider sx={{ mb: 4 }} />

      {/* Three items side by side */}
      <Grid container spacing={4} justifyContent="center">
        {/* Item 1 */}
        <Grid item xs={12} sm={4} textAlign="center" mx={5}>
          <IconButton>
            <HomeOutlinedIcon sx={{ fontSize: 50,backgroundColor:"rgb(247, 247, 247)", color:"black" , borderRadius:"50%", padding:"10px"}} />
          </IconButton>
          <Typography variant="h6" mt={2}>
            Create a listing for your <br /> place in just a few steps
          </Typography>
        </Grid>

        {/* Item 2 */}
        <Grid item xs={12} sm={4} textAlign="center" mx={5}>
          <IconButton>
            <AccessTimeOutlinedIcon sx={{ fontSize: 50,backgroundColor:"rgb(247, 247, 247)", color:"black" , borderRadius:"50%", padding:"10px"}} />
          </IconButton>
          <Typography variant="h6" mt={2}  textAlign="center" >
          Go at your own pace, and <br /> make changes whenever
          </Typography>
        </Grid>

        {/* Item 3 */}
        <Grid item xs={12} sm={4} textAlign="center" mx={5}>
          <IconButton>
            <ForumOutlinedIcon sx={{ fontSize: 50,backgroundColor:"rgb(247, 247, 247)", color:"black" , borderRadius:"50%", padding:"10px"}} />
          </IconButton>
          <Typography variant="h6" mt={2}>
            Get 1:1 support from <br /> experienced hosts at any time
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewSection;

import React from "react";
import { Box, Button, Container, TextField, Divider,Typography, Link } from "@mui/material";

export default function ProfessionalHostingTools() {
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Account &gt; <strong>Professional hosting tools</strong>
        </Typography>

        <Typography variant="h4" fontWeight="800" mb={3} color="#484848">
          Professional hosting tools
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Company
          </Typography>
          <Link href="#" underline="" fontWeight="medium" color="#484848">
            Manage
          </Link>
        </Box>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Edit your company info and manage your listings at scale
        </Typography>
<Divider/>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom mt={3} mb={3}>
          Create a custom profile URL
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Share this URL when you want to show off your Airbnb profile, which has links to all of your listings.
        </Typography>

        <Box display="flex" gap={1} mb={2}>
          <TextField
            fullWidth
            value="Airbnb.com/p/"
            size="small"
            sx={{ flex: 1 }}
          />
          <Button variant="contained" sx={{ px: 3 ,background:"#484848"}} >
            Save
          </Button>
          <Button variant="outlined" disabled sx={{ px: 3 }}>
            Copy
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Tip:</strong> Help to make your URL memorable by using words and phrases relevant to what you offer.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Avoid including contact info, property types and regions only, trademarks, or travel company names (including Airbnb).{" "}
          <Link href="#" underline="" color="#484848">Learn more about our policies</Link>
        </Typography>
      </Box>
    </Container>
  );
}

// src/components/Message/MessagesPage.jsx
import React from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const MessagesPage = () => {
  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box width="430px" borderRight="1px solid #ddd" display="flex" flexDirection="column" p={3}>
        {/* Top Section (Title + Icons) */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">Messages</Typography>
          <Box>
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
            <IconButton size="small">
              <SettingsIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Filters */}
        <Box display="flex" gap={1}>
          <Button variant="contained" size="small" sx={{ borderRadius: '20px', textTransform: 'none', boxShadow: 'none' }}>
            All
          </Button>
          <Button variant="outlined" size="small" sx={{ borderRadius: '20px', textTransform: 'none' }}>
            Unread
          </Button>
        </Box>

        {/* Centered Empty State */}
        <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" mt={5}>
          <ChatBubbleOutlineIcon sx={{ fontSize: 50, color: "grey.500", mb: 2 }} />
          <Typography variant="h6" fontWeight="bold">
            You don’t have any messages
          </Typography>
          <Typography color="text.secondary" fontSize={14} mt={1}>
            When you receive a new message, it will appear here.
          </Typography>
        </Box>
      </Box>

      {/* Right side (empty white area) */}
      <Box flex={1} />
    </Box>
  );
};

export default MessagesPage;

import React, { useRef, useState } from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

const videoData = [
  {
    src: 'https://stream.media.muscache.com/I6PbLKE4PdmU2WcRgpIxC01f61MSGKq9tKQmzjO9BOW00.mp4?v_q=high',
    title: 'Listing editor',
    description: 'Showcase every detail of your home',
  },
  {
    src: 'https://stream.media.muscache.com/pCleFvVYU2kPzpfl01uy7qNS7nj7OZmeUccdzd5lHCzo.mp4?v_q=high',
    title: 'Calendar',
    description: 'Manage your availability and pricing',
  },
  {
    src: 'https://stream.media.muscache.com/LOZ9bfCW02wd2keSIUQtEEEGuhW01sd21aDDOWD8iQTuc.mp4?v_q=high',
    title: 'Messages',
    description: 'Quickly message guests and support',
  },
];

const ToolsSection = () => {
  const videoRefs = useRef([]);
  const [playingStates, setPlayingStates] = useState(videoData.map(() => false));

  const togglePlay = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        updatePlayingState(index, true);
      } else {
        video.pause();
        updatePlayingState(index, false);
      }
    }
  };

  const updatePlayingState = (index, isPlaying) => {
    const newStates = [...playingStates];
    newStates[index] = isPlaying;
    setPlayingStates(newStates);
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 5 }}>
      {/* Title */}
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{ textAlign: 'center', mb: 6, whiteSpace: 'pre-line' }}
      >
        {"All the tools you need\nto host, all in one app"}
      </Typography>

      {/* Video Grid */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          justifyContent: 'space-between',
        }}
      >
        {videoData.map((video, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              backgroundColor: '#f7f7f7',
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Video */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.src}
              style={{
                width: '100%',
                height: '400px',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
              muted
              playsInline
              onClick={() => togglePlay(index)}
            />

            {/* Play/Pause Button */}
            <IconButton
              onClick={() => togglePlay(index)}
              sx={{
                position: 'absolute',
                bottom: 70,
                left: 10,
                backgroundColor: 'white',
                boxShadow: 1,
                '&:hover': { backgroundColor: '#eee' },
              }}
            >
              {playingStates[index] ? <Pause /> : <PlayArrow />}
            </IconButton>

            {/* Text below video */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography fontWeight="bold" sx={{ fontSize: '1.3rem' }}>
                {video.title}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '1.1rem', mt: 1 }}>
                {video.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Divider After Section */}
      <Divider sx={{ my: 16, borderColor: '#54565d', borderBottomWidth: 1 }} />
    </Box>
  );
};

export default ToolsSection;

import React from "react";
import { Box, Typography } from "@mui/material";
import musicNote from "../../assets/music_note.png"; // ⬅️ replace with your path

const WaitingForSong: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center"
      px={2}
    >
      <Box mb={2}>
        <img src={musicNote} alt="Music note" style={{ width: 48, height: 48 }} />
      </Box>
      <Typography variant="h5" fontWeight={500}>
        Waiting for next song…
      </Typography>
    </Box>
  );
};

export default WaitingForSong;
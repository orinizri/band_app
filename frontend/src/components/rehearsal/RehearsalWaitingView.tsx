import React from "react";
import { Box, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const RehearsalWaitingView: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="70vh"
      textAlign="center"
      sx={{
        border: "2px dashed #ccc",
        borderRadius: "8px",
        backgroundColor: "#fefcf6",
        px: 2
      }}
    >
      <MusicNoteIcon sx={{ fontSize: 60, color: "#ffc107", mb: 2 }} />
      <Typography variant="h5" color="text.primary">
        Waiting for next song…
      </Typography>
    </Box>
  );
};

export default RehearsalWaitingView;
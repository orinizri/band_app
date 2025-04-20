import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

export interface Song {
  id: string;
  title: string;
  artist: string;
  image?: string;
}

interface SongCardProps {
  song: Song;
  onSelect: (song: Song) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      onClick={() => onSelect(song)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f5f2ec",
        borderRadius: 2,
        p: 1.5,
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { backgroundColor: "#eeeae4" },
      }}
    >
      {/* Left side: image + text */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {song.image && (
          <Box
            component="img"
            src={song.image}
            alt={song.title}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              objectFit: "cover",
              mr: 2,
            }}
          />
        )}
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {song.title} – {song.artist}
        </Typography>
      </Box>

      {/* Right side: icons */}
      <Box>
        <IconButton size="small" aria-label="text-only">
          <TextFieldsIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
        <IconButton size="small" aria-label="lyrics & chords">
          <InsertPhotoIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
        <IconButton size="small" aria-label="music icon">
          <MusicNoteIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SongCard;

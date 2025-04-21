import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { isHebrew } from "../../utilities/utilities";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Song } from "../../types/song.type";

export type SongWord = {
  lyrics: string;
  chords?: string;
};

export type SongLine = SongWord[];

interface LiveSongDisplayProps {
  song: Song; // array of lines → array of { lyrics, chords }
}

const LiveSongDisplay: React.FC<LiveSongDisplayProps> = ({ song }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user || !user.role) {
    navigate("/");
    return null; // Redirect to login if user is not authenticated
  }
  const isSinger = user.role === "singer";
  const allLyrics = song.song
    .flat()
    .map((w) => w.lyrics)
    .join(" ");
  const direction = isHebrew(allLyrics) ? "rtl" : "ltr";
  return (
    <Box
      dir={direction}
      sx={{
        backgroundColor: "#fff",
        color: "#111",
        padding: isMobile ? "1.5rem" : "2rem",
        borderRadius: 4,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        fontFamily: "inherit",
      }}
    >
      {song.song.map((line, lineIdx) => (
        <Box key={lineIdx} mb={3}>
          {!isSinger && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#d4a000",
              }}
            >
              {line.map((word, i) => (
                <span key={i}>{word.chords ?? "\u00A0"}</span>
              ))}
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              fontSize: "1.25rem",
              lineHeight: 1.8,
            }}
          >
            {line.map((word, i) => (
              <span key={i}>{word.lyrics}</span>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default LiveSongDisplay;

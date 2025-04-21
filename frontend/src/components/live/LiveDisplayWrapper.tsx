import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Fab, useTheme, useMediaQuery } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import LiveSongDisplay from "./LiveSongDisplay";
import { Song } from "../../types/song";
import { AuthUser } from "../../context/AuthContext";

interface LivePageWrapperProps {
  song: Song;
  user: AuthUser;
  onQuit?: () => void; // shown only if role === 'admin'
}

const LivePageWrapper: React.FC<LivePageWrapperProps> = ({
  song,
  user,
  onQuit,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [autoScroll, setAutoScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (autoScroll && scrollRef.current) {
      interval = setInterval(() => {
        scrollRef.current?.scrollBy({ top: 1.5, behavior: "smooth" });
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoScroll]);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        paddingTop: isMobile ? "1rem" : "2rem",
        paddingBottom: "1rem",
        position: "relative",
      }}
    >
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          {song.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {song.artist}
        </Typography>
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          maxHeight: "calc(100vh - 180px)",
          overflowY: "auto",
          paddingX: isMobile ? 2 : 4,
        }}
      >
        <LiveSongDisplay song={song} />
      </Box>

      {/* Floating Auto Scroll Button */}
      <Fab
        color={autoScroll ? "primary" : "default"}
        onClick={() => setAutoScroll((prev) => !prev)}
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1000,
        }}
        aria-label="Toggle auto scroll"
      >
        <KeyboardArrowDownIcon />
      </Fab>

      {/* Admin-only Quit Button */}
      {user.role === "admin" && onQuit && (
        <Fab
          color="error"
          onClick={onQuit}
          sx={{
            position: "fixed",
            bottom: "2rem",
            left: "2rem",
            zIndex: 1000,
          }}
          aria-label="Quit"
        >
          <CloseIcon />
        </Fab>
      )}
    </Box>
  );
};

export default LivePageWrapper;

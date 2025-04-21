import React from "react";
import { Box, Typography } from "@mui/material";
import SongCard from "./SongCard";
import { Song } from "../../types/song.type";

interface SongListProps {
  songs: Song[];
  onSelect: (song: Song) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, onSelect }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Recommended song list
      </Typography>
      <Box display="flex" flexDirection="column" gap={1.5}>
        {songs.map((song) => (
          <SongCard key={song.id} song={song} onSelect={onSelect} />
        ))}
      </Box>
    </Box>
  );
};

export default SongList;

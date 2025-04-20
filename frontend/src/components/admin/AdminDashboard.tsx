import React, { useEffect, useState } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import SongSearchBar from "../songs/SongSearchBar";
import SongList from "../songs/SongList";
import { Song } from "../songs/SongCard";
import { songService } from "../../services/songService";

const AdminDashboard: React.FC = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const fetched = await songService.fetchSongs();
        setSongs(fetched);
      } catch (error) {
        console.error("Failed to load songs", error);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, []);

  const filteredSongs = songs.filter((song) =>
    `${song.title} ${song.artist}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <SongSearchBar query={query} onQueryChange={setQuery} />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : filteredSongs.length > 0 ? (
        <SongList
          songs={filteredSongs}
          onSelect={(song) => console.log("Select", song)}
        />
      ) : (
        <Typography textAlign="center" mt={4}>
          No songs found.
        </Typography>
      )}
    </Container>
  );
};

export default AdminDashboard;

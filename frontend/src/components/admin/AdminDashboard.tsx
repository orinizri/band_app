import { useEffect, useState } from "react";
import {
  Box,
  Container,
  CircularProgress,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { sendSelectedSong } from "../../utilities/utilities";
import SongSearchBar from "../songs/SongSearchBar";
import SongList from "../songs/SongList";
import { songService } from "../../services/songService";
import { useNavigate } from "react-router-dom";
import { Song } from "../../types/song.type";
import { AuthUser } from "../../context/AuthContext";

const AdminDashboard = ({
  setSelectedSong,
  setError,
  user,
}: {
  setSelectedSong: (x: Song) => void;
  setError: (x: string | null) => void;
  user: AuthUser;
}) => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        if (!user || !user.token || user.role !== "admin") {
          navigate("/");
          return;
        }
        const data = await songService.fetchSongs(user.token);
        setSongs(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load songs:", err);
        setError("Failed to load songs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [user, navigate, setError]);

  const filteredSongs = songs.filter((song) =>
    `${song.title}`.toLowerCase().includes(query.toLowerCase())
  );

  const handleSongSelect = (song: Song) => {
    console.info("Selected song:", song);
    setSelectedSong(song);
    // Send via socket to LivePage
    sendSelectedSong(song);
  };

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6 }}>
      <Typography
        variant="h4"
        fontWeight={600}
        mb={3}
        textAlign="center"
        color="primary"
      >
        Select a Song
      </Typography>

      <SongSearchBar query={query} onQueryChange={setQuery} />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : filteredSongs.length > 0 ? (
        <SongList songs={filteredSongs} onSelect={handleSongSelect} />
      ) : (
        <Typography textAlign="center" mt={4} color="text.secondary">
          No songs found. Try a different name 🎵
        </Typography>
      )}
    </Container>
  );
};

export default AdminDashboard;

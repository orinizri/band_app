import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
// import SongSearchBar from "./SongSearchBar";
// import SongList from "./SongList";
import { Song } from "../../types/song"; // Define a type for songs if needed

const AdminDashboard: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  const handleSearch = async (query: string) => {
    // TODO: Replace with real API call
    console.log("Searching for:", query);

    // Simulated response
    const fakeResults: Song[] = [
      {
        id: "1",
        title: "Hey Jude",
        artist: "The Beatles",
        image: "/assets/hey_jude.jpg",
      },
      {
        id: "2",
        title: "Imagine",
        artist: "John Lennon",
        image: "/assets/imagine.jpg",
      },
    ];

    setSongs(fakeResults);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Search any song…
      </Typography>

      {/* <SongSearchBar onSearch={handleSearch} /> */}

      <Box mt={4}>
        {/* <SongList songs={songs} /> */}
      </Box>
    </Container>
  );
};

export default AdminDashboard;
import { api } from "../lib/axios";
import { Song } from "@/components/songs/SongCard";

export const songService = {
  async fetchSongs(): Promise<Song[]> {
    const response = await api.get("/songs");
    return response.data;
  },
};

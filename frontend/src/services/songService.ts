import { api } from "../lib/axios";
import { Song } from "../types/song.type";
import { prepareHeaders } from "../utilities/utilities";

export const songService = {
  /**
   * Fetches all songs from the server.
   * @returns {Promise<Song[]>} A promise that resolves to an array of songs.
   */
  async fetchSongs(token: string): Promise<Song[]> {
    // Fetch all songs from the server
    const response = await api.get("/songs", prepareHeaders(token));
    return response.data;
  },
};

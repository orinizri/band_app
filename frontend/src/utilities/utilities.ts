import socket from "../lib/socket";
import { Song } from "../types/song.type";

export function prepareHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function isHebrew(text: string): boolean {
  const hebrewCharRegex = /[\u0590-\u05FF]/;
  const matches = text.match(hebrewCharRegex);
  return !!matches;
}

// Admin Only
export function sendQuitSong() {
  // This function is used to send the quit song event to the server
  socket.emit("quitSong");
}

// Admin Only
export function sendSelectedSong(song: Song) {
  // This function is used to send the selected song to the server
  socket.emit("selectSong", {
    title: song.title,
    artist: song.artist,
    song: song.song,
  });
}
import { useEffect, useState } from "react";
import socket from "../lib/socket";
import { Song } from "../types/song.type";

export function useLiveSong() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  useEffect(() => {
    socket.on("songSelected", (data: Song) => {
      setCurrentSong(data);
    });

    socket.on("quitSong", () => {
      setCurrentSong(null);
    });

    return () => {
      socket.off("songSelected");
      socket.off("quitSong");
    };
  }, []);

  return currentSong;
}

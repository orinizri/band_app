import { SongLine } from "@/components/live/LiveSongDisplay";

export type Song = {
  id: string;
  title: string;
  artist?: string;
  imageUrl?: string;
  song: SongLine[]; // actual structured song content
};
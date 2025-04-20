import { Injectable } from '@nestjs/common';
import { Song } from './entities/song.entity';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SongsService {
  private songs: Song[] = [];

  constructor() {
    this.loadSongsFromJson();
  }

  private loadSongsFromJson() {
    const dataFolder = path.resolve(process.cwd(), 'src/song/data');
    const files = fs.readdirSync(dataFolder);

    files.forEach((file) => {
      const filePath = path.join(dataFolder, file);
      const raw = fs.readFileSync(filePath, 'utf8');

      interface SongJson {
        title: string;
        artist?: string;
        image?: string;
        chords?: string;
        lyrics?: string;
      }

      const json = JSON.parse(raw) as SongJson;

      const song: Song = {
        id: uuidv4(),
        title: json.title,
        artist: json.artist || 'Unknown',
        imageUrl: json.image || undefined,
        chords: json.chords || '',
        lyrics: json.lyrics || '',
      };

      this.songs.push(song);
    });
  }

  getAll(): Song[] {
    return this.songs;
  }
}

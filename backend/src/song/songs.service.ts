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
    console.log('Loading songs from:', dataFolder);
    const files = fs.readdirSync(dataFolder);

    files.forEach((file) => {
      const filePath = path.join(dataFolder, file);
      const raw = fs.readFileSync(filePath, 'utf8');

      const json = JSON.parse(raw) as string[];
      const song: Song = {
        id: uuidv4(),
        title: file.split('.')[0].replace(/_/g, ' '),
        song: json,
      };

      this.songs.push(song);
    });
  }

  getAll(): Song[] {
    return this.songs;
  }
}

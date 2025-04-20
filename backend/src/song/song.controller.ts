import { Controller, Get } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './entities/song.entity';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  getAllSongs(): Song[] {
    return this.songsService.getAll();
  }
}

import { Controller, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './entities/song.entity';
// import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllSongs(): Song[] {
    console.log('Fetching all songs');
    return this.songsService.getAll();
  }
}

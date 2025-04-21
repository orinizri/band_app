import { Controller, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './entities/song.entity';
// import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/utilities/user/user.enums';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Get('/')
  getAllSongs(): Song[] {
    console.info('Fetching all songs for admin');
    return this.songsService.getAll();
  }
}

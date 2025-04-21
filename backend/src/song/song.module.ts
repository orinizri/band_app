import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './song.controller';

@Module({
  providers: [SongsService],
  exports: [SongsService],
  controllers: [SongsController],
})
export class SongsModule {}

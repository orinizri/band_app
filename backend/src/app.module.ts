import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { SongsModule } from './song/song.module';
import { AppGateway } from './gateway/app.gateway';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SongsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppGateway,
  ],
})
export class AppModule {}

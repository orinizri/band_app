import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  // Global Guards
  app.useGlobalGuards(new JwtAuthGuard(), new RolesGuard(new Reflector()));
  
  
  await app.listen(config.get('PORT') || 3000);
}
bootstrap();

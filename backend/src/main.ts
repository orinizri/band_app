import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
// import { RolesGuard } from './auth/guards/roles.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const isProd = config.get<string>('NODE_ENV') === 'production';
  // ✅ CORS: Allow dev + production frontend
  app.enableCors({
    origin: [
      'http://localhost:3000', // Development frontend
      'http://127.0.0.1:3000', // Development frontend
      'https://jamoveo-two.vercel.app', // Vercel frontend
    ],
    credentials: true,
  });

  const port = config.get<number>('PORT') || 3000;
  await app.listen(port);
  console.info(
    `🚀 Server ready at ${
      isProd
        ? process.env.REACT_APP_API_URL
        : `http://localhost:${process.env.PORT}`
    }`,
  );
}
void bootstrap();

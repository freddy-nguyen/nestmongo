import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService); //ENV
  const port = configService.get<string>('PORT');

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public')); //js, css, images
  app.setBaseViewsDir(join(__dirname, '..', 'view')); //view
  app.setViewEngine('ejs');
  app.enableCors(
    {
      "origin": "http://localhost:4173",
      "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
      "preflightContinue": false,
      "credentials": true, //temporary
    }
  );
  await app.listen(port);
}
bootstrap();
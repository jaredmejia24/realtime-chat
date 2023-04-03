import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('realtime-chat');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: [
      'htm',
      'html',
      'css',
      'js',
      'ico',
      'jpg',
      'jpeg',
      'png',
      'svg',
    ],
    index: ['index.html'],
    maxAge: '1m',
    redirect: false,
  };

  app.useStaticAssets(join(__dirname, '..', 'public'), options);

  app.enableCors({ origin: true, credentials: true });

  app.use(cookieParser());

  await app.listen(4000);
}
bootstrap();

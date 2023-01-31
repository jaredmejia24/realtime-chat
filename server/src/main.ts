import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors({ origin: true, credentials: true });

  app.use(cookieParser());

  await app.listen(4000);
}
bootstrap();

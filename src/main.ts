import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { apiLimiter } from './common/middlewares/rate-limiters';

async function main() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors({
    origin: configService.get<string>('corsUrl'),
    credentials: true,
  });
  app.use(apiLimiter);
  await app.listen(process.env.PORT ?? 5001);
}

main();

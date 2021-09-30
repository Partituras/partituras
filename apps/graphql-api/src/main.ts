/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.GRAPHQL_PORT;

  await app.listen(port, () => {
    Logger.log('Listening at http://0.0.0.0:' + port);
  });
}

bootstrap();

import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${process.env.SEARCH_MICROSERVICE_PORT || 3334}`,
        package: 'Api.Partituras.V1',
        protoPath: path.join(__dirname, '../../../proto/search.proto'),
      },
    }
  );

  await app.listen();
}

bootstrap();

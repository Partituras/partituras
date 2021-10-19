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
        url: `${process.env.HOST}:${process.env.PORT}`,
        package: 'Api.Partituras.V1',
        protoPath: path.join(__dirname, 'assets/proto/partitura.proto'),
      },
    }
  );

  await app.listen();
}

bootstrap();

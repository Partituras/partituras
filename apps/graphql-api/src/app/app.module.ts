import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppResolver } from './app.resolver';
import path from 'path';

const PACKAGE = 'Api.Partituras.V1';
const PROTO_PATH = path.join(__dirname, 'assets/proto');

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PARTITURA_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: `${process.env.PARTITURA_GRPC_HOST}:${process.env.PARTITURA_GRPC_PORT}`,
          package: PACKAGE,
          protoPath: `${PROTO_PATH}/partitura.proto`,
        },
      },
      // TODO Add PDF Service client here
    ]),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: true,
      playground: true,
    }),
  ],
  providers: [AppResolver],
})
export class AppModule {}

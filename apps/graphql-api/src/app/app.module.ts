import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppResolver } from './app.resolver';
import path from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PARTITURA_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: `${process.env.PARTITURA_GRPC_HOST}:${process.env.PARTITURA_GRPC_PORT}`,
          package: 'Api.Partituras.V1',
          protoPath: path.join(__dirname, 'assets/proto/partitura.proto'),
        },
      },
      {
        name: 'SEARCH_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: `${process.env.SEARCH_GRPC_HOST}:${process.env.SEARCH_GRPC_PORT}`,
          package: 'Api.Partituras.V1',
          protoPath: path.join(__dirname, 'assets/proto/search.proto'),
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

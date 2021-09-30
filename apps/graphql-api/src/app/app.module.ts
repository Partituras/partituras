import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import path from 'path';
import { PartituraResolver } from './partitura.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PARTITURA_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: process.env.PARTITURA_GRPC_URL,
          package: 'Api.Partituras.V1',
          protoPath: path.join(__dirname, '../../../proto/partitura.proto'),
        },
      },
      {
        name: 'SEARCH_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: process.env.SEARCH_GPRC_URL,
          package: 'Api.Partituras.V1',
          protoPath: path.join(__dirname, '../../../proto/search.proto'),
        },
      },
    ]),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: true,
      playground: true,
    }),
  ],
  providers: [PartituraResolver],
})
export class AppModule {}

import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { PartituraId } from '@partituras/domain';
import { GetAllRequest, GetByIdRequest } from '@partituras/services';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @GrpcMethod('PartituraService', 'GetById')
  async getById(body: GetByIdRequest<PartituraId>) {
    const item = await this.service.getById(body);
    if (!item) {
      throw new RpcException({
        code: status.NOT_FOUND,
      });
    }
    return item;
  }

  @GrpcMethod('PartituraService', 'GetAll')
  async getAll(body: GetAllRequest<PartituraId>) {
    return await this.service.getAll(body);
  }
}

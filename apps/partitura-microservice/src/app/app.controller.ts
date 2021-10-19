import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  GetAllRequest,
  GetByIdRequest,
  IPartituraService,
} from '@partituras/services';
import { status } from '@grpc/grpc-js';

@Controller()
export class AppController {
  constructor(
    @Inject('IPartituraService') private readonly service: IPartituraService
  ) {}

  @GrpcMethod('PartituraService', 'GetById')
  async getById(body: GetByIdRequest) {
    const item = await this.service.getById(body);
    if (!item) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Could not find partitura with id "${body.id}"`,
      });
    }
    return item;
  }

  @GrpcMethod('PartituraService', 'GetAll')
  async getAll(body: GetAllRequest) {
    return await this.service.getAll(body);
  }
}

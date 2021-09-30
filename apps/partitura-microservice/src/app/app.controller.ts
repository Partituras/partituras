import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetAllRequest,
  GetByIdRequest,
  IPartituraService,
} from '@partituras/services';

@Controller()
export class AppController {
  constructor(
    @Inject('IPartituraService') private readonly service: IPartituraService
  ) {}

  @GrpcMethod('PartituraService', 'GetById')
  async getById(body: GetByIdRequest) {
    return await this.service.getById(body);
  }

  @GrpcMethod('PartituraService', 'GetAll')
  async getAll(body: GetAllRequest) {
    return await this.service.getAll(body);
  }
}

import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IPartituraService } from '@partituras/services';

@Controller()
export class AppController {
  constructor(
    @Inject('IPartituraService') private readonly service: IPartituraService
  ) {}

  @GrpcMethod('PartituraService', 'GetById')
  async getById(body: { id: string }) {
    return await this.service.getById(body.id);
  }

  @GrpcMethod('PartituraService', 'GetAll')
  async getAll(body: { paginationOptions: { limit: number; next: number } }) {
    return await this.service.getAll(body.paginationOptions);
  }
}

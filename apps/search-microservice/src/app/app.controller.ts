import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ISearchService, SearchRequest } from '@partituras/services';

@Controller()
export class AppController {
  constructor(
    @Inject('ISearchService') private readonly service: ISearchService
  ) {}

  @GrpcMethod('SearchService', 'Search')
  async search(body: SearchRequest) {
    return await this.service.search(body);
  }
}

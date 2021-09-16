import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ISearchService } from '@partituras/services';

@Controller()
export class AppController {
  constructor(
    @Inject('ISearchService') private readonly service: ISearchService
  ) {}

  @GrpcMethod('SearchService', 'Search')
  async search(body: {
    query: string;
    paginationOptions: { limit: number; next: number };
  }) {
    return await this.service.search(body.query, body.paginationOptions);
  }
}

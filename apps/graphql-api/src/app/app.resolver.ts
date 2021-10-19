import { Inject, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { Partitura } from '@partituras/domain';
import { IPartituraService, PaginationOptions } from '@partituras/services';
import { PartituraSchema } from './app.schema';

@ArgsType()
export class PaginationArgs implements PaginationOptions {
  @Field((type) => Int)
  limit: number = 10;

  @Field((type) => Int)
  next: 0;
}

@Resolver((of) => PartituraSchema)
export class AppResolver implements OnModuleInit {
  private service: IPartituraService;

  constructor(
    @Inject('PARTITURA_CLIENT') private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.service =
      this.client.getService<IPartituraService>('PartituraService');
  }

  @Query((returns) => PartituraSchema)
  async partitura(@Args('id') id: string): Promise<Partitura> {
    return await this.service.getById({ id });
  }

  @Query((returns) => [PartituraSchema])
  async partituras(@Args() args: PaginationArgs): Promise<Partitura[]> {
    const { items } = await this.service.getAll({
      paginationOptions: { ...args },
    });
    return items;
  }
}

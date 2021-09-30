import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { PartituraSchema } from './partitura.model';
import { Partitura, PartituraId } from '@partituras/domain';
import { Inject, NotFoundException, OnModuleInit } from '@nestjs/common';
import { IPartituraService, PaginationOptions } from '@partituras/services';
import { ClientGrpc } from '@nestjs/microservices';

@ArgsType()
export class PaginationArgs implements PaginationOptions {
  @Field((type) => Int)
  limit: number = 10;

  @Field((type) => Int)
  next: 0;
}

@Resolver((of) => PartituraSchema)
export class PartituraResolver implements OnModuleInit {
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
    const partitura = await this.service.getById({ id });
    if (!partitura) {
      throw new NotFoundException(id);
    }
    return partitura;
  }

  @Query((returns) => [PartituraSchema])
  async partituras(@Args() args: PaginationArgs): Promise<Partitura[]> {
    const { items } = await this.service.getAll({
      paginationOptions: { ...args },
    });
    return items;
  }
}

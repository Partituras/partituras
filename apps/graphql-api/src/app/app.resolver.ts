import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  Args,
  ArgsType,
  Field,
  InputType,
  Int,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Genre, Partitura, PartituraId } from '@partituras/domain';
import {
  FilterOptions,
  GetAllRequest,
  GetByIdRequest,
  IPartituraService,
  PaginatedPartiturasResponse,
  PaginationOptions,
} from '@partituras/services';
import {
  PaginatedPartiturasResponseSchema,
  PartituraSchema,
} from './app.schema';

@ArgsType()
export class GetByIdArgs implements GetByIdRequest<PartituraId> {
  @Field((type) => String)
  id: PartituraId;
}

@InputType()
export class FilterOptionsArgs implements FilterOptions {
  @Field((type) => String, { nullable: true })
  matches: string;

  @Field(() => String, { nullable: true })
  startsWith: string;

  @Field(() => String, { nullable: true })
  genre: Genre;
}

@InputType()
export class PaginationArgs implements PaginationOptions<PartituraId> {
  @Field(() => Int, { defaultValue: 10 })
  limit: number;

  @Field(() => String, { nullable: true, defaultValue: null })
  next: PartituraId;
}

@ArgsType()
export class GetAllArgs implements GetAllRequest<PartituraId> {
  @Field(() => FilterOptionsArgs, { nullable: true })
  filter: FilterOptions;

  @Field(() => PaginationArgs, {
    defaultValue: { limit: 10, next: null },
  })
  options: PaginationOptions<PartituraId>;
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
  async partitura(args: GetByIdArgs): Promise<Partitura> {
    return await this.service.getById(args);
  }

  @Query((returns) => PaginatedPartiturasResponseSchema)
  async partituras(
    @Args() args: GetAllArgs
  ): Promise<PaginatedPartiturasResponse> {
    console.log('RESOLVER REQ', args);
    const response = await this.service.getAll(args);
    console.log('RESOLVER RES', response);
    return response;
  }
}

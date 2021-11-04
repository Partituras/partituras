import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Audio,
  AuthorList,
  Duration,
  Format,
  FormatList,
  FormatType,
  Genre,
  Lyrics,
  Nullable,
  Partitura,
  PartituraId,
  Playlist,
  Resource,
  UrlList,
} from '@partituras/domain';
import {
  PaginatedPartiturasResponse,
  Pagination,
  PaginationOptions,
} from '@partituras/services';

@ObjectType({ description: 'PaginationOptions' })
export class PaginationSchema {
  @Field((type) => String, { nullable: true })
  next: PartituraId;
}

@ObjectType({ description: 'Resource' })
export class ResourceSchema implements Readonly<Resource> {
  @Field()
  uri: string;
}

@ObjectType({ description: 'Lyrics' })
export class LyricsSchema implements Readonly<Lyrics> {
  @Field()
  text: string;
}

@ObjectType({ description: 'Format' })
export class FormatSchema implements Readonly<Format> {
  @Field((type) => String)
  type: FormatType;

  @Field((type) => ResourceSchema)
  url: Resource;
}

@ObjectType({ description: 'Audio' })
export class AudioSchema implements Readonly<Audio> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field((type) => Int)
  duration: Duration;

  @Field((type) => [FormatSchema])
  formats: FormatList;
}

@ObjectType({ description: 'Partitura' })
export class PartituraSchema implements Readonly<Partitura> {
  @Field((type) => ID)
  id: PartituraId;

  @Field({})
  title: string;

  @Field((type) => String)
  genre: Genre;

  @Field((type) => [String], { defaultValue: [] })
  poetry: AuthorList;

  @Field((type) => [String], { defaultValue: [] })
  music: AuthorList;

  @Field((type) => [ResourceSchema])
  scores: UrlList;

  @Field((type) => LyricsSchema, { nullable: true })
  lyrics: Nullable<Lyrics>;

  @Field((type) => ResourceSchema, { nullable: true })
  cover: Nullable<Resource>;

  @Field((type) => [AudioSchema], { nullable: true })
  playlist: Nullable<Playlist>;

  @Field((type) => ResourceSchema)
  source: Resource;
}

@ObjectType({ description: 'Paginated Partituras Response' })
export class PaginatedPartiturasResponseSchema
  implements Readonly<PaginatedPartiturasResponse>
{
  @Field((type) => [PartituraSchema], { defaultValue: [] })
  items: Partitura[];
  @Field((type) => PaginationSchema)
  pagination: Pagination<PartituraId>;
}

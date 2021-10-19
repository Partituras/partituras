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

  @Field()
  title: string;

  @Field((type) => String)
  genre: Genre;

  @Field((type) => [String])
  poetry: AuthorList;

  @Field((type) => [String])
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

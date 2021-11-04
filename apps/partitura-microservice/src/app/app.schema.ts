import {
  AuthorList,
  Genre,
  Lyrics,
  Nullable,
  Partitura,
  PartituraId,
  Playlist,
  Resource,
  UrlList,
} from '@partituras/domain';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class ResourceClass implements Resource {
  @Prop({ type: String })
  uri: string;
}

@Schema()
class LyricsClass implements Lyrics {
  @Prop({ type: String })
  text: string;
}

@Schema({ collection: 'partituras', id: true })
export class PartituraClass implements Readonly<Partitura> {
  id: PartituraId; // Use alias for id from schema definition

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: String, required: true })
  genre: Genre;

  @Prop({ type: [String], default: [] })
  poetry: AuthorList;

  @Prop({ type: [String] })
  music: AuthorList;

  @Prop([ResourceClass])
  scores: UrlList;

  @Prop({ type: LyricsClass })
  lyrics: Nullable<Lyrics>;

  @Prop({ type: ResourceClass, required: false, default: null })
  cover: Nullable<Resource>;

  @Prop(
    raw([
      {
        title: String,
        description: String,
        duration: Number,
        formats: [
          {
            type: String,
            url: ResourceClass,
          },
        ],
      },
    ])
  )
  playlist: Nullable<Playlist>;

  @Prop({ type: ResourceClass })
  source: Resource;
}

export type PartituraDocument = PartituraClass & Document;

export const PartituraSchema = SchemaFactory.createForClass(PartituraClass);
PartituraSchema.index({ title: 'text' });

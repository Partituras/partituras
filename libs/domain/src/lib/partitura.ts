import { Nullable, UniqueId, Resource } from './common';

export type Duration = number;

export type Playlist = Array<Audio>;

export type UrlList = Array<Resource>;

export type AuthorList = Array<string>;

export type FormatList = Array<Format>;

export type FormatType = string; //'ogg' | 'mp3';

export type PartituraId = UniqueId;

export type Genre = string;

export type Lyrics = {
  text: string;
};

export interface Format {
  type: FormatType;
  url: Resource;
}

export interface Audio {
  title: string;
  description: string;
  duration: Duration;
  formats: FormatList;
}

/**
 * @deprecated
 */
interface OldResource {
  url: string;
}

/**
 * @deprecated
 */
interface OldFormat {
  format: FormatType;
  url: string;
}

/**
 * @deprecated
 */
interface OldAudio extends Pick<Audio, 'title' | 'description' | 'duration'> {
  formats: Array<OldFormat>;
}

/**
 * @deprecated
 */
type OldPlaylist = Array<OldAudio>;
/**
 * @deprecated
 */
export interface OldPartitura {
  id: PartituraId;
  title: string;
  genre: Genre;
  poetry: AuthorList;
  music: AuthorList;
  scores: Array<OldResource>;
  lyrics: Nullable<Lyrics>;
  cover: Nullable<{ source: string }>;
  playlist: Nullable<OldPlaylist>;
  source: OldResource;
}

export interface Partitura {
  id: PartituraId;
  title: string;
  genre: Genre;
  poetry: AuthorList;
  music: AuthorList;
  scores: UrlList;
  lyrics: Nullable<Lyrics>;
  cover: Nullable<Resource>;
  playlist: Nullable<Playlist>;
  source: Resource;
}

export const convertToNewFormat = (old: OldPartitura): Partitura => ({
  id: old.id,
  title: old.title,
  genre: old.genre,
  poetry: old.poetry,
  music: old.music,
  scores: old.scores.map((i) => ({ uri: i.url })),
  lyrics: old.lyrics,
  cover:
    old.cover === null
      ? null
      : {
          uri: old.cover.source,
        },
  playlist:
    old.playlist === null
      ? null
      : old.playlist.map((i) => ({
          title: i.title,
          description: i.description,
          duration: i.duration,
          formats: i.formats.map((f) => ({
            type: f.format,
            url: { uri: f.url },
          })),
        })),
  source: {
    uri: old.source.url,
  },
});

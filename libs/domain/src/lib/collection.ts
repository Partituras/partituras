import { UniqueId } from './common';
import { Partitura, PartituraId } from './partitura';

export type CollectionId = UniqueId;

export interface Collection {
  id: CollectionId;
  title: string;
  items: Array<Partitura>;
}

export const create = (title: string): Omit<Collection, 'id'> => ({
  title,
  items: [],
});

export const contains = (collection: Collection, id: PartituraId): boolean => {
  return collection.items.some((i) => i.id === id);
};

export const totalItems = (collection: Collection): number =>
  collection.items.length;

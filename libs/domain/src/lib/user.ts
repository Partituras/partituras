import { UniqueId } from './common';
import { PartituraId } from './partitura';

export type UserId = UniqueId;

export interface User {
  id: UserId;
  favorites: Array<PartituraId>;
}

export const isFavorited = (user: User, partituraId: PartituraId): boolean => {
  return user.favorites.some((id) => id === partituraId);
};

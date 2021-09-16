import {
  PaginatedResponse,
  PaginationOptions,
  IPartituraService,
} from './types';
import { convertToNewFormat, Partitura, PartituraId } from '@partituras/domain';
import data from '@partituras/json-data';

export class JsonPartituraService implements IPartituraService {
  getById(id: PartituraId): Promise<Partitura> {
    return new Promise((resolve, reject) => {
      const item = data.find((item) => item.id === id);
      if (item) {
        return resolve(convertToNewFormat(item));
      }
      reject(new Error(`Partitura with id ${id} was not found`));
    });
  }
  getAll(options: PaginationOptions): Promise<PaginatedResponse<Partitura>> {
    return new Promise((resolve) => {
      const items = data
        .slice(options.next, options.next + options.limit)
        .map(convertToNewFormat);
      resolve({
        items,
        paginationInfo: {
          prev: options.next,
          next: options.next + options.limit,
        },
      });
    });
  }
}

import {
  PaginatedResponse,
  PaginationOptions,
  IPartituraService,
  GetByIdRequest,
  GetAllRequest,
} from './types';
import { convertToNewFormat, Partitura, PartituraId } from '@partituras/domain';
import data from '@partituras/json-data';

export class JsonPartituraService implements IPartituraService {
  getById(request: GetByIdRequest): Promise<Partitura> {
    return new Promise((resolve) => {
      const { id } = request;
      const item = data.find((item) => item.id === id);
      resolve(item ? convertToNewFormat(item) : null);
    });
  }
  getAll(request: GetAllRequest): Promise<PaginatedResponse<Partitura>> {
    return new Promise((resolve) => {
      const { paginationOptions } = request;
      const items = data
        .slice(
          paginationOptions.next,
          paginationOptions.next + paginationOptions.limit
        )
        .map(convertToNewFormat);
      resolve({
        items,
        paginationInfo: {
          prev: paginationOptions.next,
          next: paginationOptions.next + paginationOptions.limit,
        },
      });
    });
  }
}

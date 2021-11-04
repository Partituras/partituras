import {
  PaginatedResponse,
  PaginationOptions,
  IPartituraService,
  GetByIdRequest,
  GetAllRequest,
} from './types';
import { convertToNewFormat, Partitura, PartituraId } from '@partituras/domain';
import data from '@partituras/json-data';

/**
 * @deprecated Use another implementation
 */
export class JsonPartituraService implements IPartituraService {
  getById(request: GetByIdRequest<PartituraId>): Promise<Partitura> {
    return new Promise((resolve) => {
      const { id } = request;
      const item = data.find((item) => item.id === id);
      resolve(item ? convertToNewFormat(item) : null);
    });
  }
  getAll(
    request: GetAllRequest<PartituraId>
  ): Promise<PaginatedResponse<Partitura, PartituraId>> {
    return new Promise((resolve) => {
      const { options } = request;
      const items = data.slice(0, options.limit).map(convertToNewFormat);

      resolve({
        items,
        pagination: {
          next: null,
        },
      });
    });
  }
}

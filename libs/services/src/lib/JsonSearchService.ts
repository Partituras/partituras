import { ISearchService, PaginationOptions, PaginatedResponse } from './types';
import { convertToNewFormat, Partitura } from '@partituras/domain';
import data from '@partituras/json-data';

export class JsonSearchService implements ISearchService {
  search(
    query: string,
    options: PaginationOptions
  ): Promise<PaginatedResponse<Partitura>> {
    return new Promise((resolve) => {
      const expression = new RegExp(query.toLowerCase(), 'gi');

      const items = data
        .filter((item) => expression.test(item.title))
        .slice(options.next, options.next + options.limit)
        .map((item) => convertToNewFormat(item));

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

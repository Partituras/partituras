import {
  Partitura,
  PartituraId,
  PdfDocument,
  Nullable,
} from '@partituras/domain';

export type PaginationOptions = {
  limit: number;
  next: number;
};

export interface PaginatedResponse<T> {
  items: Array<T>;
  paginationInfo: {
    prev: number;
    next: number;
  };
}

export interface IPartituraService {
  getById(id: PartituraId): Promise<Nullable<Partitura>>;
  getAll(options: PaginationOptions): Promise<PaginatedResponse<Partitura>>;
}

export interface ISearchService {
  search(
    query: string,
    options: PaginationOptions
  ): Promise<PaginatedResponse<Partitura>>;
}

export interface IPdfService {
  generatePdf(partitura: Partitura): Promise<PdfDocument>;
}

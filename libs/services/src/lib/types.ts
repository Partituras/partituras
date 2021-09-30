import {
  Nullable,
  Partitura,
  PartituraId,
  PdfDocument,
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

export interface GetByIdRequest {
  id: PartituraId;
}

export interface GetAllRequest {
  paginationOptions: PaginationOptions;
}

export interface SearchRequest {
  query: string;
  options: PaginationOptions;
}

export interface GeneratePdfRequest {
  partitura: Partitura;
}

export interface IPartituraService {
  getById(request: GetByIdRequest): Promise<Nullable<Partitura>>;
  getAll(request: GetAllRequest): Promise<PaginatedResponse<Partitura>>;
}

export interface ISearchService {
  search(request: SearchRequest): Promise<PaginatedResponse<Partitura>>;
}

export interface IPdfService {
  generatePdf(request: GeneratePdfRequest): Promise<PdfDocument>;
}

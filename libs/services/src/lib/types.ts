import {
  Genre,
  Nullable,
  Partitura,
  PartituraId,
  PdfDocument,
} from '@partituras/domain';

export type Cursor<I> = Nullable<I>;

export type Pagination<I> = {
  next: Cursor<I>;
};

export type PaginationOptions<I> = {
  limit: number;
  next: Cursor<I>;
};

export interface PaginatedRequest<I> {
  options: PaginationOptions<I>;
}

export interface PaginatedResponse<T, I> {
  items: Array<T>;
  pagination: Pagination<I>;
}

export type PaginatedPartiturasResponse = PaginatedResponse<
  Partitura,
  PartituraId
>;

export interface GetByIdRequest<I> {
  id: I;
}

export type FilterOptions = {
  matches?: string;
  startsWith?: string;
  genre?: Genre;
};

export interface GetAllRequest<I> extends PaginatedRequest<I> {
  filter?: FilterOptions;
}

export interface SearchRequest<I> extends PaginatedRequest<I> {
  query: string;
}

export interface GeneratePdfRequest {
  partitura: Partitura;
}

export interface IPartituraService {
  getById(request: GetByIdRequest<PartituraId>): Promise<Nullable<Partitura>>;
  getAll(
    request: GetAllRequest<PartituraId>
  ): Promise<PaginatedPartiturasResponse>;
}

export interface IPdfService {
  generatePdf(request: GeneratePdfRequest): Promise<PdfDocument>;
}

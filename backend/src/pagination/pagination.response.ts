export interface PaginationResponseMeta {
  totalItems: number;
  totalItemsInPage: number;
  currentPage: number;
  totalPages: number;
}

export interface PaginationResponseLink {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export class PaginationResponse<T = any> {
  items: T[];
  meta: PaginationResponseMeta;
  links: PaginationResponseLink;
}

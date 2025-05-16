// Page

export type Page<T> = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  empty: boolean;
};

// Errors
export interface BadRequestBody {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errors: string[];
}

export interface NotFoundErrorBody {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

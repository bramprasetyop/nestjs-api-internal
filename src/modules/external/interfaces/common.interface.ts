export interface PaginationMeta {
  total: number;
  pageSize: number;
  currentPage: number;
  totalPage: number;
}

export interface SortBy {
  columnName: string;
  sortOrder: string;
}

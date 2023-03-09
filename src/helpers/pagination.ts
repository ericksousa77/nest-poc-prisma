interface PaginationConfig {
  page?: number;
  pageSize?: number;
}

interface Pagination {
  page: number;
  pageSize: number;
  calculatePageCount: (total: number) => number;
}

export const getPagination = ({
  page = 1,
  pageSize = 10,
}: PaginationConfig = {}): Pagination => {
  if (page <= 0) page = 1;
  return {
    page: page - 1,
    pageSize,
    calculatePageCount: (total: number) => Math.ceil(total / pageSize),
  };
};

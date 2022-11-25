export type PaginationData<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
  data: T[];
};

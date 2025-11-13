export type SearchAdvance = {
  dependency_id: string;
  dependency_value: string;
  operator: 'equal' | 'like' | 'not-equal';
};

export type PaginationType = {
  page: number;
  limit: number;
};

export type OrderSortType = {
  dependency_id: string;
  type: 'asc' | 'desc';
};

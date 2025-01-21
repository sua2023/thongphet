export interface FilterState {
  page: number;
  offset: number;
  sort_by: string;
  order_by: string;
  start_date: string;
  end_date: string;
  filter: FilterType | null;
}

export interface FilterType {
  search: string;
  status: string;
  isApproved?: string;
}

export interface ScheduleFilterState {
  page: number;
  offset: number;
  order_by: string;
  sort_by: string;
  start_date: Date | string;
  end_date: Date | string;
  filter: FilterType | null;
}

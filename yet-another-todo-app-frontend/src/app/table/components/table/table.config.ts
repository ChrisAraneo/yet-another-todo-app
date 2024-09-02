export const TABLE_PAGE_SIZE_OPTIONS: readonly number[] = [15, 30, 75] as const;
export const TABLE_MAX_DISPLAYED_PAGINATOR_OPTIONS = 9;
export const TABLE_DISPLAYED_COLUMNS: readonly string[] = [
  'id',
  'title',
  'description',
  'state',
  'creationDate',
  'startDate',
  'endDate',
  'actions',
] as const;

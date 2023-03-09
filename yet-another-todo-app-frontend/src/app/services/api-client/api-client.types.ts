export enum ApiResponseStatus {
  Success = 'success',
  Error = 'error',
}

export type ApiResponse<T> = {
  status: ApiResponseStatus;
  data: T | null;
  message?: string;
};

export type TaskData = {
  id: string;
  title: string;
  description: string;
  state: {
    value: string;
    iconName: string;
    color: string;
    tooltipText: string;
  };
  creationDate: string;
  startDate?: string;
  endDate?: string;
};

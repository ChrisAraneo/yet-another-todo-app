export enum ApiResponseStatus {
  Success = 'success',
  Error = 'error',
}

export interface ApiResponse<T> {
  status: ApiResponseStatus;
  data: T | null;
  message?: string;
}

export interface TaskData {
  id: string;
  title: string;
  description: string;
  state: {
    value: string;
    iconName: string;
    color: string;
  };
  creationDate: string;
  isHidden: boolean;
  startDate?: string;
  endDate?: string;
}

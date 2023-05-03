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
  };
  creationDate: string;
  isHidden: boolean;
  startDate?: string;
  endDate?: string;
};

export enum ApiResponseStatus {
  Success = 'success',
  Error = 'error',
}

export type ApiResponse = {
  status: ApiResponseStatus;
  data: ApiResponseData[] | null;
  message?: string;
};

export type ApiResponseData = {
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

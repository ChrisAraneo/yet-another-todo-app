import { ApiResponseStatus } from './api-response-status.enum';

export type ApiResponse = {
  status: ApiResponseStatus;
  message?: string;
  data: any;
};

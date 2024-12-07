export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ErrorResponse {
  error: string;
  status: number;
  details?: any;
}
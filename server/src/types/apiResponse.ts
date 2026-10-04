export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  error?: {
    code: string;
    message: string;
    fields?: Record<string, string>;
  };
  data?: T | null;
};

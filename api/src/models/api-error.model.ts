export type ApiError<T> = {
  status: number;
  message: string;
  data: T;
};

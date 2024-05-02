export interface IResponseError extends Error {
  status?: number;
  code?: number;
}

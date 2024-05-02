import { IResponseError } from '../types/ResponseError';

const HttpError = (status: number, message: string) => {
  const error: IResponseError = new Error(message);

  error.status = status;

  return error;
};

export default HttpError;

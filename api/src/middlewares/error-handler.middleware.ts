import { CustomException } from '@/constants/exceptions/custom.exception';
import { ApiResponse } from '@/models/api-response.model';
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handled errors
  if(err instanceof CustomException) {
    const { statusCode, message } = err;
    res.status(statusCode).send(<ApiResponse<undefined>>{
      status: statusCode,
      message: message,
      data: err.data || undefined,
    });
    return;
  }

  // Unhandled errors
  console.error('[ERROR HANDLER] Request from (' + req.ip + ') : ' + req.method + ' ' + req.url);
  console.error('[ERROR HANDLER] ' + err.stack);
  res.status(500).send(<ApiResponse<undefined>>{
    status: 500,
    message: 'Something went wrong',
    data: undefined,
  });
};
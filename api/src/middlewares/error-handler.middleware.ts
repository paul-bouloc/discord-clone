import { CustomException } from "@/constants/exceptions/custom.exception";
import { ApiError } from "@models/api-error.model";
import { ErrorRequestHandler, Request, Response } from "express";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
) => {
  // Handled errors
  if (err instanceof CustomException) {
    const { statusCode, message } = err;
    res.status(statusCode).send(<ApiError<undefined>>{
      status: statusCode,
      message: message,
      data: err.data || undefined,
    });
    return;
  }

  // Unhandled errors
  console.error(
    "[ERROR HANDLER] Request from (" +
      req.ip +
      ") : " +
      req.method +
      " " +
      req.url,
  );
  console.error("[ERROR HANDLER] " + err.stack);
  res.status(500).send(<ApiError<undefined>>{
    status: 500,
    message: "Something went wrong",
    data: undefined,
  });
};

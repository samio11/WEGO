import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../interfaces/error";
import { handleDuplicateError } from "../errors/handleDuplicateError";
import { handleCastError } from "../errors/handleCastError";
import { handleValidationError } from "../errors/handleValidationError";
import { handleZodError } from "../errors/handleZodError";
import { AppError } from "../errors/AppError";
import config from "../config";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something Went Wrong!!!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Opps! Error",
    },
  ];
  if (err.code === 11000) {
    const x = handleDuplicateError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err.name === "CastError") {
    const x = handleCastError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err.name === "ValidationError") {
    const x = handleValidationError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err.name === "ZodError") {
    const x = handleZodError(err);
    statusCode = x.statusCode;
    message = x.message;
    errorSources = x.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : "",
  });
};

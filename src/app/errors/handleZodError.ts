import { TErrorSources, TGenericError } from "../interfaces/error";
import z, { ZodError, ZodIssue } from "zod";

export const handleZodError = (err: ZodError): TGenericError => {
  const errorSources: TErrorSources = err?.issues?.map((x: ZodIssue) => {
    return {
      path: x?.path[x?.path.length - 1],
      message: x?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Zod Error",
    errorSources,
  };
};

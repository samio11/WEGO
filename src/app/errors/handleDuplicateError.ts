import { TErrorSources, TGenericError } from "../interfaces/error";

export const handleDuplicateError = (err: any): TGenericError => {
  const match = err?.message?.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} is already exist`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate Error",
    errorSources,
  };
};

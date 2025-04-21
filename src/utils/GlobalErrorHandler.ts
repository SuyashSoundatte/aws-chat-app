import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statuscode?: number;
  status?: string;
  stack?: string;
}

const GlobalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statuscode = error.statuscode || 599;
  error.status = error.status || "error";

  res.status(error.statuscode).json({
    status: error.statuscode,
    message: error.message,
    stack: error.stack,
  });
};

export default GlobalErrorHandler;
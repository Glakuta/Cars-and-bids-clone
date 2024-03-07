import AppError from "../utils/appError";
import { Error as MongooseError } from "mongoose";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface CustomError extends MongooseError.CastError {
  status: number;
  statusCode: number;
  isOperational: boolean;
  errmsg: string;
}

const handleCastErrorDB = (err: MongooseError.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: CustomError) => {
  const valueMatch = err.errmsg?.match(/(["'])(\\?.)*?\1/);
  const value = valueMatch ? valueMatch[0] : "unknown";
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: MongooseError.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(" . ")}`;
  return new AppError(message, 400);
};

const handleJwtError = () => {
  new AppError("Invalid token, please login again!", 401);
};

const handleExpiredToken = () => {
  new AppError("Your token has expired, please login again", 403);
};
const sendErrDev = (err: any, res: Response) => {
  res.status(err.status).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: CustomError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJwtError();
    if (error.name === "TokenExpiredError") error = handleExpiredToken();

    sendErrorProd(error, res);
  }
};

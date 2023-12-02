import AppError from "../utils/appError";
import { Error as MongooseError } from "mongoose";

export const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  new AppError(message, 400);
};

export const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

export const handleValidationErrorDB = (err: MongooseError.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(" . ")}`;
  return new AppError(message, 400);
};

export const handleJwtError = () => {
  new AppError("Invalid token, please login again!", 401);
};

export const handleExpiredToken = () => {
  new AppError("Your token has expired, please login again", 403);
};

export const sendErrDev = (err, res) => {
  res.status(err.stausCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
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

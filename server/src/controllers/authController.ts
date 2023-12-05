import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { User, UserInterface } from "../models/user";
import AppError from "../utils/appError";

const verify = promisify(jwt.verify);

const singnToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRES,
  });
};

const createSendToken = (
  user: UserInterface,
  statusCode: number,
  res: Response
) => {
  const token = singnToken(user._id);
  const expiresIn = process.env.JWT_COOKIE_EXPIRES
    ? new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
      )
    : undefined;

  const cookieOptions = {
    expires: expiresIn,
    httpOnly: true,
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = "";

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = console.log("token");

    res.status(201).json({
      status: "Success",
      token,
      data: {
        data: newUser,
      },
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return next(new AppError("Please provide data", 401));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("There is no such user", 401));
    }
    const correct = user.correctPassword(password, user.password);
    if (!correct) {
      return next(new AppError("Wrong email or password", 401));
    }

    createSendToken(user, 200, res);
  }
);

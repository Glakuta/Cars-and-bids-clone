import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import { User } from "../models/user";
import AppError from "../utils/appError";

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      status: "Success",
      results: users.length,
      data: {
        data: users,
      },
    });
  }
);

export const getUsrer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return next(new AppError("There is no user with this id!", 401));
    }

    res.status(200).json({
      staus: "Success",
      data: {
        user: user,
      },
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password || req.body.confirmPassword) {
      return next(new AppError("You can't update password here", 401));
    }

    const user = User.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!user) {
      return next(new AppError("There is no user with this id!", 401));
    }
    res.status(200).json({
      status: "success",
      user: user,
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return next(new AppError("There is no user with this id", 401));
    }

    res.status(200).json({
      status: "success",
    });
  }
);

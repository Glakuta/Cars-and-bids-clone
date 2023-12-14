import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { Comment } from "../models/commentModel";
import { User } from "../models/user";
import { Car } from "../models/cars";

export const getComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const postComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const comment = Comment.findByIdAndUpdate({ _id: req.params.id }, req.body);

    res.status(200).json({
      status: "Success",
      data: {
        comment,
      },
    });
  }
);

export const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const comment = await Comment.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "Success",
      data: {},
    });
  }
);

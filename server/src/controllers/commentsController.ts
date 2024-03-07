import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { Comment } from "../models/commentModel";
import { User, UserInterface } from "../models/user";
import { Car } from "../models/cars";

interface AuthRequest extends Request {
  user?: UserInterface;
}

export const getComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return next(new AppError("There is no comment with this id", 401));
    }
    res.status(200).json({
      status: "Success",
      data: {
        comment,
      },
    });
  }
);

export const postComment = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("You can't post a comment, please login", 401));
    }

    const comment = await Comment.create({
      ...req.body,
      user: req.user?._id,
    });

    res.status(201).json({
      status: "Success",
      data: {
        comment,
      },
    });
  }
);

export const updateComment = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(
        new AppError("You can't update a comment, please login", 401)
      );
    }
    const comment = await Comment.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.status(200).json({
      status: "Success",
      data: {
        comment,
      },
    });
  }
);

export const deleteComment = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(
        new AppError("You can't delete a comment, please login", 401)
      );
    }
    const comment = await Comment.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "Success",
      data: {},
    });
  }
);

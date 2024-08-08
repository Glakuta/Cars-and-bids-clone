import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { Comment } from "../models/commentModel";
import { User, UserInterface } from "../models/user";
import { Car } from "../models/cars";
import { APIFeatures } from "../utils/apiFeatures";
import { CommentInterface } from "../interface/comment.interface";

interface AuthRequest extends Request {
  user?: UserInterface;
  getComment?: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<CommentInterface>;
  getAllComments?: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<CommentInterface[]>;
  postComment?: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<CommentInterface>;
  updateComment?: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<CommentInterface>;
  deleteComment?: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<CommentInterface>;
}

export const getAllComments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let filter = {};
    if (req.params.commentId) filter = { comment: req.params.commentId };
    const features = new APIFeatures(Comment.find(filter), req.query)
      .filter()
      .sort()
      .limitFields();

    const comments = await features.query;
    res.status(200).json({
      status: "Success",
      results: comments.length,
      data: {
        comments,
      },
    });
  }
);

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

    const { content, isSeller } = req.body;
    const carId = req.params.carId;

    const car = await Car.findById(carId);
    if (!car) {
      return next(new AppError("Car not found", 404));
    }

    const comment = await Comment.create({
      ...req.body,
      car: carId,
      user: req.user?._id,
    });

    const updatedCar = await Car.findByIdAndUpdate(
      carId,
      { $push: { comments: comment } },
      { new: true }
    );

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

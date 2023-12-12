import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { Car } from "../models/cars";
import { User } from "../models/user";
import { APIFeatures } from "../utils/apiFeatures";
import UserInterface from "../interface/user.interface";
import { timeStamp } from "console";

interface AuthRequest extends Request {
  user?: UserInterface;
}

export const getAllCars = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let filter = {};
    if (req.params.carId) filter = { car: req.params.carId };
    const features = new APIFeatures(Car.find(filter), req.query)
      .filter()
      .sort()
      .limitFields();
    const cars = await features.query;
    res.status(200).json({
      status: "success",
      results: cars.length,
      data: {
        data: cars,
      },
    });
  }
);

export const getCar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return next(new AppError("There is no car with this id!", 401));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: car,
      },
    });
  }
);

export const sellCar = catchAsync(
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?._id;
    const user = await User.findById(userId);

    if (!user) {
      return next(new AppError("there is no user with that id", 401));
    }
    const car = Car.create({
      ...req.body,
      seller: userId,
    });
    res.status(201).json({
      status: "success",
      data: {
        data: car,
      },
    });
  }
);

export const bidCar = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("there is no user with that id", 401));
    }
    const bid = await User.findByIdAndUpdate(req.params.id, {
      highestBid: req.body.highestBid,
      userWithHighestBid: user,
      timestamp: timeStamp,
    });

    res.status(200).json({
      status: "Success",
      data: {
        data: bid,
      },
    });
  }
);

export const updateCar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const car = await Car.findOneAndUpdate({ id: req.params.id }, req.body);
    if (!car) {
      return next(new AppError("There is no car with this id!", 401));
    }

    res.status(200).json({
      result: "success",
      data: {
        data: car,
      },
    });
  }
);

export const deleteCar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const car = await Car.findOneAndDelete({ id: req.params.id });
    if (!car) {
      return next(new AppError("There is no car with this id!", 401));
    }

    res.status(204).json({
      status: "success",
      data: {},
    });
  }
);

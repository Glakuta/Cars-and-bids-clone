import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Car } from "../models/cars";
import { User } from "../models/user";
import { APIFeatures } from "../utils/apiFeatures";
import UserInterface from "../interface/user.interface";
import { timeStamp } from "console";

interface AuthRequest extends Request {
  user?: UserInterface;
}

dotenv.config({ path: "./.env" });
const uploadJson = multer();

export const getAllCars = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let filter = {};
    if (req.params.carId) filter = { car: req.params.carId };
    const features = new APIFeatures(await Car.find(filter), req.query)
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

export const getMyCars = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("there is no user with that id", 401));
    }

    const cars = await Car.find({ seller: user._id });
    if (!cars) {
      return next(new AppError("This user has no cars", 401));
    }

    res.status(200).json({
      status: "success",
      results: cars,
      data: {
        data: cars,
      },
    });
  }
);

export const getCar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const car = await Car.findById(req.params.id);
    console.log(req.params.id);
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
    uploadJson.none()(req, res, async (err) => {
      console.log("Body: ", req.body);
      const userId = req.user?._id;
      const user = await User.findById(userId);

      if (!user) {
        return next(new AppError("there is no user with that id", 401));
      }

      const car = await Car.create({
        ...req.body,
        seller: userId,
      });
      res.status(201).json({
        status: "success",
        data: {
          data: car,
        },
      });
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

    const bid = await Car.findByIdAndUpdate(req.params.id, {
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
    const car = await Car.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!car) {
      return next(new AppError("There is no car with this id!", 401));
    }

    res.status(200).json({
      result: "success",
      data: {
        data: car,
      },
    });
    next();
  }
);

export const deleteCar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const car = await Car.findOneAndDelete({ _id: req.params.id });
    if (!car) {
      return next(new AppError("There is no car with this id!", 401));
    }

    res.status(204).json({
      status: "success",
      data: {},
    });
  }
);

export const getCarsWithin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(",");
    const numericDistance: number = parseFloat(distance);

    const radius =
      unit === "mi" ? numericDistance / 3963.2 : numericDistance / 6378.1;

    if (!lat || !lng) {
      next(
        new AppError(
          "Please provide latitutr and longitude in the format lat,lng.",
          400
        )
      );
    }

    const tours = await Car.find({
      startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        data: tours,
      },
    });
  }
);

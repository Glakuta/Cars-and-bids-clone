import { NextFunction, Request, Response } from "express";
import { s3, bucketName } from "../utils/s3config";
import multer from "multer";
import multerS3 from "multer-s3";
import { fileFilter } from "../utils/helpers";
import { Car } from "../models/cars";

const storage: multer.StorageEngine = multer.memoryStorage();
const upload = () =>
  multer({
    //fileFilter,
    storage: multerS3({
      bucket: bucketName,
      s3: s3,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  });

export const uploadImages = async (
  req: Request & { carId?: string },
  res: Response,
  next: NextFunction
) => {
  const uploadSingle = upload().single("image");

  uploadSingle(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!req.file) {
      console.log("There is no file");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const carId = req.carId;

    if (!carId) {
      console.log("Car ID is missing");
      return res.status(400).json({ error: "Car ID is missing" });
    }

    const imageUrl = req.file.destination;

    try {
      const car = await Car.findByIdAndUpdate(
        carId,
        { $push: { images: imageUrl } },
        { new: true }
      );

      if (!car) {
        console.log("Car not found");
        return res.status(404).json({ error: "Car not found" });
      }

      res.status(200).json({
        status: "success",
        data: {
          car,
          image: imageUrl,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

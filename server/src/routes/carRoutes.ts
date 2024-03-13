import { Router, Request, Response } from "express";
import multer from "multer";
import { protect } from "../controllers/authController";
import {
  bidCar,
  deleteCar,
  getAllCars,
  getCar,
  sellCar,
  updateCar,
} from "../controllers/carsConrollers";
import { uploadImages } from "../middleware/carMIddleware";

const router = Router();

router.get("/", getAllCars);
router.post("/sell-car", protect, sellCar, uploadImages);
router.patch("/bid/:id", protect, bidCar);

router
  .route("/:id")
  .get(getCar)
  .patch(protect, uploadImages, updateCar)
  .put(protect, uploadImages)
  .delete(protect, deleteCar);

export { router };

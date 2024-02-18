import { Router, Request, Response } from "express";
import { protect } from "../controllers/authController";
import {
  bidCar,
  deleteCar,
  getAllCars,
  getCar,
  sellCar,
  updateCar,
  uploadImages,
} from "../controllers/carsConrollers";

const router = Router();

router.get("/", getAllCars);
router.post("/sell-car", protect, uploadImages, sellCar);
router.patch("/bid/:id", protect, bidCar);

router
  .route("/:id")
  .get(getCar)
  .patch(protect, updateCar)
  .delete(protect, deleteCar);

export { router };

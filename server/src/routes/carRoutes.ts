import { Router, Request, Response } from "express";
import { protect } from "../controllers/authController";
import {
  deleteCar,
  getAllCars,
  getCar,
  sellCar,
  updateCar,
} from "../controllers/carsConrollers";

const router = Router();

router.get("/", getAllCars);
router.post("/sell-car", protect, sellCar);

router
  .route("/:id")
  .get(getCar)
  .patch(protect, updateCar)
  .delete(protect, deleteCar);

export { router };

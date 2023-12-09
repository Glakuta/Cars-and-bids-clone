import { Router, Request, Response } from "express";
import {
  signIn,
  login,
  protect,
  forgotPassword,
  updatePassword,
  resetPassword,
} from "../controllers/authController";
import {
  getUsrer,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = Router();

router.post("/login", signIn);
router.post("/signup", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updatePassword", protect, updatePassword);

//router.get("me", protect, getUsrer);
//router.patch("/updateMe", updateUser);
//router.delete("/deleteMe", deleteUser);

router.get("/allUsers");

router
  .route("/:id")
  .get(protect, getUsrer)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

export { router };

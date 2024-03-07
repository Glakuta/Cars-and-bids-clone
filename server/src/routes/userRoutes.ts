import { Router, Request, Response } from "express";
import {
  signIn,
  login,
  protect,
  forgotPassword,
  updatePassword,
  resetPassword,
  sendVerifyEmail,
  verifyEmail,
  logout,
} from "../controllers/authController";
import { getUser, updateUser, deleteUser } from "../controllers/userController";

const router = Router();

router.post("/login", login);
router.post("/signin", signIn);
router.post("/forgotPassword", forgotPassword);
//router.get("/sendVerificationEmail", sendVerifyEmail);
router.get("/logout", logout);
router.patch("/verifyEmail/:verifyToken", verifyEmail);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updatePassword", protect, updatePassword);

//router.get("me", protect, getUsrer);
//router.patch("/updateMe", updateUser);
//router.delete("/deleteMe", deleteUser);

router.get("/allUsers");

router
  .route("/:id")
  .get(protect, getUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

export { router };

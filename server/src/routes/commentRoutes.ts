import { Router, Request, Response } from "express";
import { protect } from "../controllers/authController";
import {
  deleteComment,
  getAllComments,
  getComment,
  postComment,
  updateComment,
} from "../controllers/commentsController";

const router = Router();

router.get("/", getAllComments);
router.post("/:carId", protect, postComment);
router
  .route(":carId/:id")
  .get(getComment)
  .patch(protect, updateComment)
  .delete(protect, deleteComment);

export { router };

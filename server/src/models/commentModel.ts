import mongoose, { Model } from "mongoose";
import { CommentInterface } from "../interface/comment.interface";
import { User } from "./user";

const CommentSchema = new mongoose.Schema<CommentInterface>(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: true,
    },
    content: {
      type: String,
      minlength: 12,
      maxlength: 256,
      required: true,
    },
    isSeller: Boolean,
  },
  { timestamps: true }
);

export const Comment = mongoose.model<CommentInterface>(
  "comments",
  CommentSchema
);

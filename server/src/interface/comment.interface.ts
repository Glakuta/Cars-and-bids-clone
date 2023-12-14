import { Document, ObjectId } from "mongoose";

export interface CommentInterface {
  user: ObjectId;
  date: Date;
  content: string;
  isSeller: boolean;
}

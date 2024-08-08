import { Document, ObjectId } from "mongoose";

export interface CommentInterface {
  _id: string;
  user: ObjectId;
  car: ObjectId;
  date: Date;
  content: string;
  isSeller: boolean;
}

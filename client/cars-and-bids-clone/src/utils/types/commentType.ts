import { User } from "./userTypes";
import { Car } from "./carsType";

export type Comment = {
  _id: string;
  content: string;
  isSeller: boolean;
  car: Car;
  user: User;
};

export type Comments = {
  comments: Comment[];
  error: string | null;
  loading: boolean;
  success: boolean;
};

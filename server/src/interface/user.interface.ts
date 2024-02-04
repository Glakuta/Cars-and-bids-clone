import { Document, ObjectId } from "mongoose";

export default interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  phoneNumber: number;
  profile: Array<String>;
  paymentInfo: Object;
  role: "user" | "admin";
  cars: ObjectId;
  _id: ObjectId;
  createdAt?: Date;
  passwordChangedAt?: Date;
  resetPasswordToken: String | undefined;
  isVeryfied: boolean;
  verificationEmailToken: string;
  verificationEmailExpiredAt: Date;
  resetPasswordTokenExpiredAt: Date | undefined;
  correctPassword(email: string, password: string): Promise<boolean>;
  changedPasswordAfter(JWTTimeStamp: Date): boolean;
  createResetPasswordToken: () => string;
}

export interface AuthRequest extends Request {
  user: UserInterface;
}

export default interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

import { Document } from "mongoose";

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
  _id: string;
  createdAt?: Date;
  passwordChangedAt?: Date;
  resetPasswordToken: string;
  resetPasswordTokenExpiredAt: Date;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimeStamp: Date): boolean;
  createResetPasswordToken: () => string;
}

export default interface AuthRequest extends Request {
  user?: UserInterface;
}

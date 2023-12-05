import { Document } from "mongoose";

interface UserInterface extends Document {
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
}

export default UserInterface;

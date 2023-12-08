import mongoose from "mongoose";
import UserInterface from "../interface/user.interface";
import { isEmail } from "validator";
import bcrypt from "bcrypt";
import { randomBytes, createHash } from "crypto";

const UserSchema = new mongoose.Schema<UserInterface>({
  _id: String,
  username: { type: String, required: true, minlength: 5, maxlenghth: 40 },
  email: {
    type: String,
    requird: true,
    validate: [isEmail, "Invalid email"],
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true, minlength: 8, select: false },
  passwordConfirm: {
    type: String,
    required: [true, "Password dosent match"],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: "Password confirmation does not match password",
    },
  },
  fullName: { type: String },
  phoneNumber: { type: Number },
  profile: {
    bio: { type: Text },
    photo: { type: String },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  paymentInfo: {
    cardName: { type: String, required: true },
    zipCode: { type: String, required: true },
    creditCardNumber: { type: Number, required: true },
    expiration: { type: Number, required: true },
    cvc: { type: Number, required: true },
  },
  createdAt: Date,
  passwordChangedAt: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpiredAt: Date,
});

UserSchema.statics.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (JWTTimeStamp: Date) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime();
    return JWTTimeStamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};
UserSchema.methods.createResetPasswordToken = function () {
  const resetToken = randomBytes(32).toString("hex");

  this.resetPasswordToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordTokenExpiredAt = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
export const User = mongoose.model<UserInterface>("Users", UserSchema);
export { UserInterface };

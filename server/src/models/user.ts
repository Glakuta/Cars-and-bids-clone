import mongoose, { Model, Schema } from "mongoose";
import UserInterface from "../interface/user.interface";
import bcrypt from "bcrypt";
import { randomBytes, createHash } from "crypto";
import { Car } from "./cars";
import AppError from "../utils/appError";

interface UserModel extends Model<UserInterface> {
  correctPassword(email: string, password: string): Promise<boolean>;
}

const UserSchema: Schema<UserInterface> = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 5, maxlength: 40 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 8, select: false },
    passwordConfirm: {
      type: String,
      required: [true, "Password dosent match"],
      validate: {
        validator: function (this: UserInterface, value: string): boolean {
          return this.password === value;
        },
        message: "Password confirmation does not match password",
      },
      select: false,
    },
    fullName: { type: String },
    phoneNumber: { type: Number },
    profile: {
      bio: { type: String },
      photo: { type: String },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    cars: {
      type: mongoose.Schema.ObjectId,
      ref: Car,
    },
    passwordChangedAt: Date,
    resetPasswordToken: { type: String },
    resetPasswordTokenExpiredAt: { type: Date },
    verificationEmailToken: { type: String },
    verificationEmailExpiredAt: { type: Date },
    isVerified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined as unknown as string;
  next();
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  if (!this.resetPasswordToken) {
    this.passwordChangedAt = new Date(Date.now() - 1000);
  }

  next();
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

  this.resetPasswordTokenExpiredAt = Date.now() + 70 * 60 * 1000; // Set to 10 minutes in the future

  return resetToken;
};

UserSchema.methods.createEmailVerificationToken = function () {
  const verificationToken = randomBytes(32).toString("hex");
  this.verificationEmailToken = createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  this.verificationEmailExpiredAt = new Date(Date.now() + 70 * 60 * 1000);
  return this.save().then(() => verificationToken);
};

export const User = mongoose.model<UserInterface, UserModel>(
  "Users",
  UserSchema
);
export { UserInterface };

import mongoose from "mongoose";
import { isEmail } from "validator";

const UserSchema = new mongoose.Schema({
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

export const User = mongoose.model("Users", UserSchema);

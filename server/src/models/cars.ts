import mongoose, { Schema } from "mongoose";
import CarInterface from "../interface/car.interface";
import { User } from "./user";

const CarSchema: Schema<CarInterface> = new mongoose.Schema(
  {
    vin: { type: String, required: true },
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    mileage: { type: Number, required: true },
    status: { type: String, required: true },
    engine: { type: String, required: true },
    drivetrain: { type: String, required: true },
    interiorColor: { type: String, required: true },
    exteriorColor: { type: String, required: true },
    bodyStyle: { type: String, required: true },
    specialOptions: { type: String },
    images: { type: [String] },
    carLocation: { type: String, required: true },
    carDamage: { type: Boolean, require: true },
    carMods: { type: Boolean, require: true },
    modeDetails: { type: String },
    damageDetailis: { type: String },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: "Comment" },
    seller: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    highestBid: { type: Number },
    userWithHighestBid: { type: mongoose.Schema.ObjectId, ref: "User" },
    auctionExpires: { type: Date },
  },
  { timestamps: true }
);

export const Car = mongoose.model("Cars", CarSchema);

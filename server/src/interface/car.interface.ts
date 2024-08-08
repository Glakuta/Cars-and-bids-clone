import { Document, ObjectId } from "mongoose";

export default interface CarInterface {
  _id: ObjectId;
  vin: string;
  year: number;
  make: string;
  model: string;
  images: string[];
  transmission: string;
  mileage: number;
  status: string;
  engine: string;
  drivetrain: string;
  fuelType: string;
  bodyStyle: string;
  interiorColor: string;
  exteriorColor: string;
  specialOptions: string;
  carLocation: string;
  carDamage: boolean;
  carMods: boolean;
  modeDetails: string;
  damageDetailis: string;
  comments: ObjectId;
  seller: ObjectId;
  highestBid: number;
  userWithHighestBid: ObjectId;
  auctionExpires: Date;
}

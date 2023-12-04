import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  vin: { type: Number, required: true },
  year: { type: Number, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  transmission: { type: String, required: true },
  mileage: { type: Number, required: true },
  specialOprions: { type: Text },
  carLocation: { type: String, required: true },
  carDamage: { type: Boolean, require: true },
  carMods: { type: Boolean, require: true },
  modeDetails: { type: Text },
  damageDetailis: { type: Text, required: true },
  comments: { type: String },
  seller: {},
});

export const CarsModel = mongoose.model("Cars", CarSchema);

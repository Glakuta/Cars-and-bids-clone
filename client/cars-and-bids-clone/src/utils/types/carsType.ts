import { User } from "./userTypes";

export type Car = {
  _id?: string;
  vin?: string;
  year?: string;
  make?: string;
  model?: string;
  transmission?: string;
  details?: string;
  mileage?: string;
  specialOptions?: string;
  carLocation?: string;
  carDamage?: boolean;
  carMods?: boolean;
  modeDetails?: string;
  damageDetailis?: string;
  comments?: unknown;
  seller?: User;
  highestBid?: number;
  userWithHighestBid?: User;
  auctionExpires?: Date;
};

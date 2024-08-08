import { User } from "./userTypes";

export type Car = {
  _id: string;
  vin: string;
  year: string;
  make: string;
  model: string;
  transmission?: string;
  images?: string[];
  interiorColor: string;
  exteriorColor: string;
  bodyStyle: string;
  fuelType: string;
  engine: string;
  drivetrain: string;
  details: string;
  status: string;
  mileage: string;
  specialOptions?: string;
  location: string;
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

export type Cars = {
  data: { cars: Car[] };
  error: string | null;
  loading: boolean;
  success: boolean;
};

export interface FileUploadProps {
  limit: number;
  multiple: boolean;
  name: string;
}

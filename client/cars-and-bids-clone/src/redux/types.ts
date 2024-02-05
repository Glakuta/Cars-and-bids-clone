import { Cars } from "../utils/types/carsType";

export interface IUser {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  phoneNumber?: string;
  profile: {
    bio: string;
    photo: string;
  };
  role: {
    type: string;
    enum: ["user", "admin"];
  };
  cars: Cars[];
  token: string | null;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

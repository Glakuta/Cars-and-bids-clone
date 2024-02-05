import { Cars } from "./carsType";

export interface User {
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

export interface LoginUserData {
  email: string;
  password: string;
}

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

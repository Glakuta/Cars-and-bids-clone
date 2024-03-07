import { Cars } from "./carsType";

export interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
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
  passwordConfirm: string;
  submit?: string;
}

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  success: boolean;
  loading: boolean;
}

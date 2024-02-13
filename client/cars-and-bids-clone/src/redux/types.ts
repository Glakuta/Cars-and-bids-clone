import { Cars } from "../utils/types/carsType";
import { User } from "../utils/types/userTypes";

export interface IUser {
  _id: string;
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
  accessToken: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { user: User };
}

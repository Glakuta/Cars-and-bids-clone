import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, requird: true },
  authentication: {
    password: { type: String, required: true },
  },
  fullName: { type: String },
  phoneNumber: { type: Number },
  profile: {
    bio: { type: Text },
    photo: { type: String },
  },
  paymentInfno: {
    cardName: { type: String, required: true },
    zipCode: { type: String, required: true },
    creditCardNumber: { type: Number, required: true },
    expiration: { type: Number, required: true },
    cvc: { type: Number, required: true },
  },
});

export const UserModel = mongoose.model("User", UserSchema);
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const addPayment = (values: Record<string, any>) =>
  new UserModel(values).save().then((payment) => payment.toObject());

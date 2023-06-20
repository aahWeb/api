import { Schema, model } from "mongoose";
import { Status } from "../../user";

export interface IUser {
  _id: string;
  name: string;
  password: string;
  email: string;
  address?: string;
  status?: Status;
};

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  address: String,
  status: String,

}, {timestamps: true});

export const User = model('User', userSchema);

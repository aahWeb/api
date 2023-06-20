import { Schema, model } from "mongoose";
import { Status } from "../../user";

interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  address?: string;
  status?: Status;
};

const userSchema = new Schema<IUser>({
  username: {
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
    required: true
  },
  address: String,
  status: String,

}, {timestamps: true});

export const User = model('User', userSchema);

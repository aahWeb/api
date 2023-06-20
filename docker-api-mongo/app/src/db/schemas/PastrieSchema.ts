import { Schema, model } from "mongoose";

interface IPastrie {
  _id: string;
  ref: string;
  name: string;
  description: string;
  quantity: number;
  order: number;
  like?: string;
  tags?: string[];
  url?: string;
  choice? : boolean;
};

const pastrieSchema = new Schema<IPastrie>({
  ref: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  like: String,
  tags: [String],
  url: String,
  choice: Boolean,
}, {timestamps: true});

export const Pastrie = model('Pastrie', pastrieSchema);

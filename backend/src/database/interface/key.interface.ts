import mongoose, { Schema, Document, Model } from "mongoose";

export interface IKey extends Document {
  _id?: string;
  user_id: string;
  name?: string;
  key: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const KeySchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

let KeyModel: Model<IKey>;

try {
  KeyModel = mongoose.model<IKey>("Key");
} catch {
  KeyModel = mongoose.model<IKey>("Key", KeySchema);
}

export { KeyModel };


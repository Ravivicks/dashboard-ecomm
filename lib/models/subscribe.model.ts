import { ISubscriber } from "@/types";
import mongoose, { Schema, Model } from "mongoose";

export const subscriberSchema = new Schema<ISubscriber>(
  {
    email: { type: String, required: true },
    status: { type: String },
  },
  { timestamps: true }
);

const Subscriber: Model<ISubscriber> =
  mongoose.models.Subscriber ||
  mongoose.model<ISubscriber>("Subscriber", subscriberSchema);

export default Subscriber;

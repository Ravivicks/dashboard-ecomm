import { IAddress } from "@/types";
import mongoose, { Schema, Model } from "mongoose";

export const addressSchema = new Schema<IAddress>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  { timestamps: true }
);

const Address: Model<IAddress> =
  mongoose.models.Address || mongoose.model<IAddress>("Address", addressSchema);

export default Address;

import { IContact } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const contactSchema: Schema = new Schema(
  {
    company: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    workingHours: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;

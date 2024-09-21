import { CommonEnquireProps } from "@/types";
import mongoose, { Schema, Document, Model } from "mongoose";

export const commonEnquirySchema = new Schema<CommonEnquireProps>(
  {
    email: { type: String, required: true },
    mobile: { type: String },
    fullName: { type: String },
    productId: { type: String },
    productName: { type: String },
    productPrice: { type: Number },
    enquiryType: { type: String },
    cartProduct: [
      {
        quantity: { type: Number },
        productId: { type: String },
        productName: { type: String },
        productPrice: { type: Number },
      },
    ],
    enquiryDescription: { type: String },
    quantity: { type: Number },
    status: { type: String },
    reason: { type: String },
  },
  { timestamps: true }
);

const CommonEnquiry: Model<CommonEnquireProps> =
  mongoose.models.CommonEnquiry ||
  mongoose.model<CommonEnquireProps>("CommonEnquiry", commonEnquirySchema);

export default CommonEnquiry;

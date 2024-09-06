// models/Banner.ts
import mongoose, { Schema, Model } from "mongoose";
import { ObjectId } from "mongodb";

const bannerFileSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    imageId: { type: ObjectId, required: true }, // Store the GridFS file ID
  },
  { timestamps: true }
);

const Banner: Model<any> =
  mongoose.models.Banner || mongoose.model("Banner", bannerFileSchema);

export default Banner;

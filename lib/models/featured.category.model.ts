// models/Banner.ts
import mongoose, { Schema, Model } from "mongoose";
import { ObjectId } from "mongodb";

const featuredCategoryFileSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    categoryImageId: { type: ObjectId, required: true },
    imageId: { type: ObjectId, required: true }, // Store the GridFS file ID
  },
  { timestamps: true }
);

const FeaturedCategory: Model<any> =
  mongoose.models.FeaturedCategory ||
  mongoose.model("FeaturedCategory", featuredCategoryFileSchema);

export default FeaturedCategory;

import { IProduct } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const productSchema: Schema = new Schema(
  {
    url: { type: String }, // Allow null or undefined values but enforce uniqueness on non-null values
    currency: { type: String, required: true },
    image: { type: String, required: true },
    sliderImages: { type: Array, required: true },
    title: { type: String, required: true },
    discount: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    brand: { type: String, required: true },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    pdfFile: { type: String },
    type: { type: String },
    quantity: { type: Number },
    subCategory: { type: String },
    minQuantity: { type: Number },
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    description: { type: String },
    machineCode: { type: String }, // Machine code field to be matched in updates
    category: { type: String },
    productDescription: { type: String },
    productInformationTech: [
      {
        name: { type: String },
        value: { type: String },
      },
    ],
    productInformationAdditional: [
      {
        name: { type: String },
        value: { type: String },
      },
    ],
    reviewsCount: { type: Number },
    stars: { type: Number },
    isOutOfStock: { type: Boolean, default: false },
    users: [{ email: { type: String, required: true } }],
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;

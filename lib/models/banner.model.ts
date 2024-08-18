import { IPartnerBanner } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const bannerSchema: Schema = new Schema(
  {
    image: { type: String, required: true },
    brand: { type: String, required: true },
  },
  { timestamps: true }
);

const PartnerBanner: Model<IPartnerBanner> =
  mongoose.models.PartnerBanner ||
  mongoose.model<IPartnerBanner>("PartnerBanner", bannerSchema);

export default PartnerBanner;

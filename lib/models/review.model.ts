import { IReply } from "@/types";
import mongoose, { Document, Schema } from "mongoose";

interface LikeUnlike extends Document {
  userId: string;
  isLike: boolean;
  isUnlike: boolean;
}

interface Review extends Document {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  firstName: string;
  lastName: string;
  likes: LikeUnlike[];
  replies: IReply[];
  createdAt: Date;
  updatedAt: Date;
  userAvatar: string;
  status: string;
}

const LikeUnlikeSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    isLike: { type: Boolean, required: true },
    isUnlike: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const ReplySchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    comment: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  {
    timestamps: true,
  }
);

const ReviewSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    userAvatar: { type: String },
    likes: [LikeUnlikeSchema],
    replies: [ReplySchema],
    status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
);

const Review =
  mongoose.models.Review || mongoose.model<Review>("Review", ReviewSchema);

export default Review;

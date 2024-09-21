"use server";
import { IComment, IReply } from "@/types";
import { connectToDB } from "../mongoose";
import Review from "../models/review.model";

export async function createNewReview(review: IComment) {
  try {
    await connectToDB();
    const result = await Review.create(review);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating Review:", error);
  }
}

export async function getAllReviews(): Promise<IComment[] | any> {
  try {
    await connectToDB();

    const reviews = await Review.find();

    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch reviews");
  }
}

export async function getReviewById(id: string): Promise<IComment | null> {
  try {
    await connectToDB();

    const review = await Review.findOne({ _id: id });

    // Return plain JavaScript objects (lean returns plain objects)
    return JSON.parse(JSON.stringify(review));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to fetch reviews");
  }
}

export async function updateReview(
  id: string,
  updateData: Partial<{ status: string }>
): Promise<IComment | null> {
  try {
    // Connect to the database
    await connectToDB();

    // Find the review by ID and push the new reply to the replies array
    const result = await Review.updateOne({ _id: id }, { $set: updateData });

    // Return the updated review
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log("Error updating review:", error);
    return null;
  }
}

export async function updateLikeCount(
  reviewId: string,
  userId: string,
  likeType: "like" | "unlike"
): Promise<IComment | null> {
  try {
    // Connect to the database
    await connectToDB();

    // Update the likes array based on likeType
    const update =
      likeType === "like"
        ? {
            $set: {
              "likes.$[elem].isLike": true,
              "likes.$[elem].isUnlike": false,
            },
          }
        : {
            $set: {
              "likes.$[elem].isLike": false,
              "likes.$[elem].isUnlike": true,
            },
          };

    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId, "likes.userId": userId },
      update,
      {
        arrayFilters: [{ "elem.userId": userId }],
        new: true,
        lean: true,
      }
    ).exec();

    if (!updatedReview) {
      // If no matching like entry found, add a new like/unlike entry
      const addUpdate =
        likeType === "like"
          ? { $push: { likes: { userId, isLike: true, isUnlike: false } } }
          : { $push: { likes: { userId, isLike: false, isUnlike: true } } };

      const updatedReviewWithNewLike = await Review.findByIdAndUpdate(
        reviewId,
        addUpdate,
        { new: true, lean: true }
      ).exec();

      return JSON.parse(JSON.stringify(updatedReviewWithNewLike));
    }

    // Return the updated review
    return JSON.parse(JSON.stringify(updatedReview));
  } catch (error) {
    console.log("Error updating like count:", error);
    return null;
  }
}

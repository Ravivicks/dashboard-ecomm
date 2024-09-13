"use server";
import { ISubscriber } from "@/types";
import { connectToDB } from "../mongoose";
import Subscriber from "../models/subscribe.model";

export async function getAllSubcriber(): Promise<ISubscriber[] | any> {
  try {
    await connectToDB();

    const subscribers = await Subscriber.find();

    return JSON.parse(JSON.stringify(subscribers));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch subscribers");
  }
}

export async function getSubscriberById(
  subscriberId: string
): Promise<ISubscriber | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const subscriber = await Subscriber.findOne({ _id: subscriberId });
    return JSON.parse(JSON.stringify(subscriber));
  } catch (error) {
    console.log(error);
    return null;
  }
}

// export async function updateSubscriber(
//   id: string,
//   updateData: Partial<{
//     email: string;
//     phone: string;
//     workingHours: string;
//     address: string;
//   }>
// ) {
//   try {
//     await connectToDB();
//     const result = await Contact.updateOne({ _id: id }, { $set: updateData });
//     return result;
//   } catch (error) {
//     console.error("Error updating contact:", error);
//     throw new Error("Failed to update Contact");
//   }
// }

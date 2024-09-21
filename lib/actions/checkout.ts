"use server";

import { CheckoutData } from "@/types";
import { connectToDB } from "../mongoose";
import Checkout from "../models/checkout.model";

export async function getOrders(): Promise<CheckoutData[] | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const order = await Checkout.find();
    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateOrder(
  id: string,
  updateData: Partial<{ status: string }>
) {
  try {
    await connectToDB();
    const result = await Checkout.updateOne({ _id: id }, { $set: updateData });
    return result;
  } catch (error) {
    console.error("Error updating order:", error);
    throw new Error("Failed to update order");
  }
}

export async function getOrderById(
  orderId: string
): Promise<CheckoutData | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const order = await Checkout.findOne({ _id: orderId });
    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log(error);
    return null;
  }
}

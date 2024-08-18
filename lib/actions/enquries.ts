"use server";
import { EnquireProps } from "@/types";
import { connectToDB } from "../mongoose";
import Enquiry from "../models/enquiry.model";

export async function createNewEnquiry(enquiry: EnquireProps) {
  try {
    await connectToDB();
    const result = await Enquiry.create(enquiry);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating bulk users:", error);
  }
}

export async function getAllEnquries(): Promise<EnquireProps[] | any> {
  try {
    await connectToDB();

    const products = await Enquiry.find();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch enquries");
  }
}

export async function getEnquiryById(
  enquiryId: string
): Promise<EnquireProps | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const product = await Enquiry.findOne({ _id: enquiryId });
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateEnquiry(
  id: string,
  updateData: Partial<{ quantity: number; status: string; reason: string }>
) {
  try {
    await connectToDB();
    const result = await Enquiry.updateOne({ _id: id }, { $set: updateData });
    return result;
  } catch (error) {
    console.error("Error updating enquiry:", error);
    throw new Error("Failed to update enquiry");
  }
}

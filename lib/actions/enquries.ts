"use server";
import { CommonEnquireProps, EnquireProps } from "@/types";
import { connectToDB } from "../mongoose";
import Enquiry from "../models/enquiry.model";
import CommonEnquiry from "../models/common.enquiry.model";

export async function createNewEnquiry(enquiry: EnquireProps) {
  try {
    await connectToDB();
    const result = await Enquiry.create(enquiry);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating bulk users:", error);
  }
}

export async function getAllEnquries(): Promise<CommonEnquireProps[] | any> {
  try {
    await connectToDB();

    const products = await CommonEnquiry.find();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch enquries");
  }
}

export async function getEnquiryById(
  enquiryId: string
): Promise<CommonEnquireProps | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const product = await CommonEnquiry.findOne({ _id: enquiryId });
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
    const result = await CommonEnquiry.updateOne(
      { _id: id },
      { $set: updateData }
    );
    return result;
  } catch (error) {
    console.error("Error updating enquiry:", error);
    throw new Error("Failed to update enquiry");
  }
}

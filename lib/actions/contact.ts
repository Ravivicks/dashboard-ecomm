"use server";
import { IContact } from "@/types";
import { connectToDB } from "../mongoose";
import Contact from "../models/contact.model";

export async function createNewContact(contact: IContact) {
  try {
    await connectToDB();
    const result = await Contact.create(contact);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating contact:", error);
  }
}

export async function getAllContacts(): Promise<IContact[] | any> {
  try {
    await connectToDB();

    const contacts = await Contact.find();

    return JSON.parse(JSON.stringify(contacts));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch contacts");
  }
}

export async function getContactById(
  contactId: string
): Promise<IContact | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const contact = await Contact.findOne({ _id: contactId });
    return JSON.parse(JSON.stringify(contact));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateContact(
  id: string,
  updateData: Partial<{
    email: string;
    phone: string;
    workingHours: string;
    address: string;
  }>
) {
  try {
    await connectToDB();
    const result = await Contact.updateOne({ _id: id }, { $set: updateData });
    return result;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error("Failed to update Contact");
  }
}

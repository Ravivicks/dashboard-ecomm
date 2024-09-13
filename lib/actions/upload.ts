"use server";

import mongoose from "mongoose";
import { GridFSBucket, Db } from "mongodb";
import { connectToDB } from "../mongoose";
import { Readable } from "stream";
import Banner from "../models/banner.file.model";
import { UpdateWriteOpResult } from "mongoose";

// Function to upload image to GridFS
async function uploadImageToGridFS(
  fileBuffer: Buffer,
  filename: string,
  mimetype: string
): Promise<string> {
  await connectToDB();

  if (mongoose.connection.readyState !== 1) {
    throw new Error("Mongoose connection is not established");
  }

  const db = mongoose.connection.db as Db;
  const gfs = new GridFSBucket(db, { bucketName: "uploads" });

  return new Promise((resolve, reject) => {
    const uploadStream = gfs.openUploadStream(filename, {
      contentType: mimetype,
    });

    const readableStream = Readable.from(fileBuffer);

    readableStream
      .pipe(uploadStream)
      .on("error", (error) => {
        console.error("Error uploading file:", error);
        reject("Error uploading file");
      })
      .on("finish", () => {
        resolve(uploadStream.id.toString());
      });
  });
}

// Function to create a new partner banner
export async function createNewPartnerBanner(formData: FormData) {
  try {
    const file = formData.get("image") as File;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const company = formData.get("company") as string;

    if (!file || !title) {
      throw new Error("Missing file or title");
    }

    // Convert file to Buffer directly on the server side
    const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
      const reader = file.stream().getReader();
      const chunks: Uint8Array[] = [];

      const processStream = async ({
        done,
        value,
      }: ReadableStreamReadResult<Uint8Array>): Promise<void> => {
        if (done) {
          resolve(Buffer.concat(chunks));
          return;
        }
        chunks.push(value);
        try {
          await reader.read().then(processStream);
        } catch (err) {
          reject(err);
        }
      };

      reader.read().then(processStream).catch(reject);
    });

    const imageId = await uploadImageToGridFS(fileBuffer, file.name, file.type);

    // Save banner metadata to MongoDB
    // const PartnerBanner = (await import("../models/banner.file.model")).default;

    const banner = {
      title,
      company,
      category,
      imageId,
    };

    // Save the banner and convert the result to a plain object
    const result = await Banner.create(banner);

    // Convert to plain object if necessary
    const plainResult = result.toObject ? result.toObject() : result;

    return JSON.parse(JSON.stringify(plainResult));
  } catch (error) {
    console.error("Error creating banner:", error);
    throw new Error("Error creating banner");
  }
}

export async function getAllBanners(): Promise<any[]> {
  try {
    await connectToDB();

    if (mongoose.connection.readyState !== 1) {
      throw new Error("Mongoose connection is not established");
    }

    // Fetch all banners from the database
    const banners = await Banner.find({}).exec();

    // Construct image URLs
    const db = mongoose.connection.db as Db;
    const gfs = new GridFSBucket(db, { bucketName: "uploads" });

    const bannerWithImageUrls = banners.map((banner) => {
      const imageUrl = banner.imageId
        ? `/api/images/${banner.imageId}` // Adjust the path to your image retrieval endpoint
        : null;

      return {
        ...banner.toObject(),
        imageUrl,
      };
    });

    return JSON.parse(JSON.stringify(bannerWithImageUrls));
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw new Error("Failed to fetch banners");
  }
}

export async function getBannerById(id: string): Promise<any> {
  try {
    await connectToDB();

    if (mongoose.connection.readyState !== 1) {
      throw new Error("Mongoose connection is not established");
    }

    // Fetch a single banner by its ID
    const banner = await Banner.findById(id).exec();

    if (!banner) {
      throw new Error("Banner not found");
    }

    // Construct image URL
    const db = mongoose.connection.db as Db;
    const gfs = new GridFSBucket(db, { bucketName: "uploads" });

    const imageUrl = banner.imageId
      ? `/api/images/${banner.imageId}` // Adjust the path to your image retrieval endpoint
      : null;

    const result = {
      ...banner.toObject(),
      imageUrl,
    };
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error fetching banner by ID:", error);
    throw new Error("Failed to fetch banner by ID");
  }
}

export async function deleteBannerById(id: string): Promise<void> {
  try {
    await connectToDB();

    if (mongoose.connection.readyState !== 1) {
      throw new Error("Mongoose connection is not established");
    }

    // Fetch the banner to get the image ID
    const banner = await Banner.findById(id).exec();

    if (!banner) {
      throw new Error("Banner not found");
    }

    // Remove the banner document
    await Banner.findByIdAndDelete(id).exec();

    // Remove the associated image from GridFS if imageId exists
    if (banner.imageId) {
      const db = mongoose.connection.db as Db;
      const gfs = new GridFSBucket(db, { bucketName: "uploads" });

      // Delete the file from GridFS
      await gfs.delete(new mongoose.Types.ObjectId(banner.imageId));
    }
  } catch (error) {
    console.error("Error deleting banner by ID:", error);
    throw new Error("Failed to delete banner by ID");
  }
}

// export async function getBannerById(
//   bannerId: string
// ): Promise<IPartnerBannerFile | null> {
//   try {
//     await connectToDB();

//     // Use lean() to get a plain JavaScript object
//     const banner = await Banner.findOne({ _id: bannerId });
//     return JSON.parse(JSON.stringify(banner));
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

export async function updatePartnerBanner(id: string, formData: FormData) {
  try {
    // Connect to the database
    await connectToDB();

    const file = formData.get("image") as File | null;
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const category = formData.get("category") as string;

    if (!title) {
      throw new Error("Title is required");
    }

    let updateData: Record<string, any> = { title, company, category };

    if (file) {
      // Convert file to Buffer directly on the server side
      const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
        const reader = file.stream().getReader();
        const chunks: Uint8Array[] = [];

        const processStream = async ({
          done,
          value,
        }: ReadableStreamReadResult<Uint8Array>): Promise<void> => {
          if (done) {
            resolve(Buffer.concat(chunks));
            return;
          }
          chunks.push(value);
          try {
            await reader.read().then(processStream);
          } catch (err) {
            reject(err);
          }
        };

        reader.read().then(processStream).catch(reject);
      });

      const imageId = await uploadImageToGridFS(
        fileBuffer,
        file.name,
        file.type
      );

      updateData.imageId = imageId;
    }

    // Update the existing banner by ID using updateOne and $set
    const result: UpdateWriteOpResult = await Banner.updateOne(
      { _id: id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      throw new Error("Banner not found");
    }

    if (result.modifiedCount === 0) {
      console.warn(
        "Banner was found but not modified. Data might be the same."
      );
    }

    return result;
  } catch (error) {
    console.error("Error updating banner:", error);
    throw new Error("Error updating banner");
  }
}

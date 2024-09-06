import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

const client = mongoose.connection.getClient(); // Use the existing mongoose connection

async function getImageFromStorage(id: string): Promise<Buffer | null> {
  try {
    const bucket = new GridFSBucket(client.db("ecomm-web")); // Replace with your database name

    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      bucket
        .openDownloadStreamByName(id)
        .on("data", (chunk) => chunks.push(chunk))
        .on("end", () => resolve(Buffer.concat(chunks)))
        .on("error", (err) => {
          console.error("Error fetching image:", err);
          reject(null);
        });
    });
  } catch (error) {
    console.error("Error fetching image from storage:", error);
    return null;
  }
}

export { getImageFromStorage };

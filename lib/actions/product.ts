"use server";

import { IPartnerBanner, IProduct } from "@/types";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import PartnerBanner from "../models/banner.model";

const CHUNK_SIZE = 500; // Adjust based on performance testing

export async function createBulkProducts(products: IProduct[]) {
  try {
    await connectToDB();

    // Process in chunks
    for (let i = 0; i < products.length; i += CHUNK_SIZE) {
      const chunk = products.slice(i, i + CHUNK_SIZE);

      // Insert chunk
      const result = await Product.insertMany(
        chunk.map((product) => product, { ordered: false })
      );
      if (!result) {
        return { error: "faild" };
      }
    }

    return { result: "All products created successfully" };
  } catch (error) {
    console.error("Error creating bulk products:", error);
  }
}

export async function getAllProducts(): Promise<IProduct[] | any> {
  // page: number = 1,
  // pageSize: number = 20,
  // brand?: string
  try {
    await connectToDB();

    // // Create a filter object
    // const filter: any = {};
    // if (brand) {
    //   filter.brand = brand;
    // }

    // // Calculate the number of documents to skip
    // const skip = (page - 1) * pageSize;

    // Fetch products with brand filtering and pagination
    const products = await Product.find();
    // .skip(skip)
    // .limit(pageSize)
    // .lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
}

export async function getProductById(
  productId: string
): Promise<IProduct | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const product = await Product.findOne({ _id: productId });
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createNewPartnerBanner(banner: IPartnerBanner) {
  try {
    await connectToDB();
    const result = await PartnerBanner.create(banner);
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error creating Banner:", error);
  }
}

function formatGoogleDriveLink(imageUrl: string): string {
  // Check if the URL is in the standard Google Drive file format
  const regex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = imageUrl.match(regex);

  if (match && match[1]) {
    // Return the direct Google Drive download link
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  } else {
    // If it's already a direct link or doesn't match the pattern, return the original URL
    return imageUrl;
  }
}

export async function updateProduct(
  id: string,
  updateData: Partial<{
    discount: string;
    currentPrice: number;
    image: string;
    sliderImages: string[]; // Add slider images as an array of URLs
  }>
) {
  try {
    await connectToDB();

    // Format the main image URL if provided
    if (updateData.image) {
      updateData.image = formatGoogleDriveLink(updateData.image);
    }

    // Format all slider image URLs if provided
    if (updateData.sliderImages && Array.isArray(updateData.sliderImages)) {
      updateData.sliderImages = updateData.sliderImages.map((imageUrl) =>
        formatGoogleDriveLink(imageUrl)
      );

      // Add the main image URL to sliderImages if it's not already included
      if (
        updateData.image &&
        !updateData.sliderImages.includes(updateData.image)
      ) {
        updateData.sliderImages.push(updateData.image);
      }
    } else if (updateData.image) {
      // If sliderImages is not provided, initialize it with the main image URL
      updateData.sliderImages = [updateData.image];
    }

    const result = await Product.updateOne({ _id: id }, { $set: updateData });
    return result;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
}

export async function getBannerByBrand(
  brand: string
): Promise<IPartnerBanner | null> {
  try {
    await connectToDB();

    // Use lean() to get a plain JavaScript object
    const banner = await PartnerBanner.findOne({ brand: brand });
    return JSON.parse(JSON.stringify(banner));
  } catch (error) {
    console.log(error);
    return null;
  }
}

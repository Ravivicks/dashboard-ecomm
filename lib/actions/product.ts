"use server";

import { EnquireProps, IPartnerBanner, IProduct } from "@/types";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import Enquiry from "../models/enquiry.model";
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

export async function updateProduct(
  id: string,
  updateData: Partial<{ discount: string; currentPrice: number }>
) {
  try {
    await connectToDB();
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

"use server";

import { IPartnerBanner, IProduct, UpdateProductProps } from "@/types";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import PartnerBanner from "../models/banner.model";
import { randomUUID } from "crypto";

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

export async function updateBulkProducts(products: IProduct[]) {
  try {
    await connectToDB();

    for (let i = 0; i < products.length; i += CHUNK_SIZE) {
      const chunk = products.slice(i, i + CHUNK_SIZE);

      for (const product of chunk) {
        const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in 'YYYY-MM-DD' format

        let updateFields: any = {
          machineCode: product.machineCode,
          category: product.category,
          quantity: product.quantity,
          subCategory: product.subCategory,
          brand: product.brand,
        };

        // Perform the update or upsert (create a new entry if not found)
        const result = await Product.updateMany(
          {
            $or: [
              { title: { $regex: product.machineCode, $options: "i" } }, // Match title using regex
              { machineCode: product.machineCode }, // Match exact machineCode
            ],
          },
          {
            $set: updateFields,
          },
          { upsert: true, new: true } // Use upsert to create new entries if not found
        );

        // Check if a new document was inserted (i.e., a new product was created)
        if (result.upsertedCount > 0 && result.upsertedId) {
          const randomString = randomUUID(); // Generate a unique UUID string
          const generatedUrl = `${product.machineCode}-${currentDate}-${randomString}`;

          // Only update the newly created product with title and other fields
          await Product.updateOne(
            { _id: result.upsertedId }, // Use the upserted ID to identify the newly created product
            {
              $set: {
                url: generatedUrl, // Add the generated URL
                title: product.title, // Add the title only for new products
                currency: product.currency || "$", // Required
                image: "/images/no-product.jpg", // Default image
                sliderImages: product.sliderImages || [], // Required
                discount: product.discount || "0", // Required
                currentPrice: product.currentPrice || 0, // Required
                originalPrice: product.originalPrice || 0, // Required
                brand: product.brand || "other", // Required
                type: "all", // Default type
                lowestPrice: 0, // Default value
                reviewsCount: 100, // Default to 0 if not provided
                stars: 5, // Default to 0 if not provided
                isOutOfStock: false, // Default to false if not provided
              },
            }
          );
        }
      }
    }

    return { result: "All products updated or created successfully" };
  } catch (error: any) {
    if (error.code === 11000) {
      console.error(
        "Duplicate key error, skipping URL update:",
        error.keyValue
      );
    } else {
      console.error("Error updating bulk products:", error);
    }
    return { error: "Failed to update or create products" };
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
    title: string;
    discount: string;
    lowestPrice: number;
    image: string;
    sliderImages: string[];
    quantity: number;
    minQuantity: number;
    category: string;
    machineCode: string;
    type: string;

    // Add slider images as an array of URLs
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

export async function updateCategoryAndQuantityByCode(
  productCode: string,
  category: string,
  quantity: number
) {
  try {
    await connectToDB();

    // Ensure quantity is a valid number
    if (isNaN(quantity)) {
      throw new Error("Invalid quantity");
    }

    // Prepare update data
    const updateData: Partial<{
      category: string;
      quantity: number;
    }> = {
      category: category.trim(),
      quantity,
    };

    // Update all products where the title contains the productCode
    const result = await Product.updateMany(
      { title: { $regex: productCode, $options: "i" } }, // Case-insensitive regex search
      { $set: updateData }
    );

    // Check if the update was successful
    if (result.modifiedCount === 0) {
      throw new Error("No products found or no changes made");
    }

    return result;
  } catch (error) {
    console.error("Error updating category and quantity by code:", error);
    throw new Error("Failed to update category and quantity by code");
  }
}

"use server";

import Enquiry from "../models/enquiry.model";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";

export interface IStats {
  products: {
    total: number;
    available: number;
    outOfStock: number;
  };
  enquiries: {
    total: number;
    pending: number;
    completed: number;
  };
  //   orders: {
  //     total: number;
  //     completed: number;
  //     rejected: number;
  //   };
}

export async function getStats(): Promise<IStats | null> {
  try {
    await connectToDB();

    const productsCount = await Product.countDocuments();
    const availableProductsCount = await Product.countDocuments({
      isOutOfStock: false,
    });
    const outOfStockProductsCount = await Product.countDocuments({
      isOutOfStock: true,
    });

    const enquiriesCount = await Enquiry.countDocuments();
    const pendingEnquiriesCount = await Enquiry.countDocuments({
      status: "pending",
    });
    const completedEnquiriesCount = await Enquiry.countDocuments({
      status: "success",
    });

    // const ordersCount = await Order.countDocuments();
    // const completedOrdersCount = await Order.countDocuments({ status: 'completed' });
    // const rejectedOrdersCount = await Order.countDocuments({ status: 'rejected' });

    return {
      products: {
        total: productsCount,
        available: availableProductsCount,
        outOfStock: outOfStockProductsCount,
      },
      enquiries: {
        total: enquiriesCount,
        pending: pendingEnquiriesCount,
        completed: completedEnquiriesCount,
      },
      //   orders: {
      //     total: ordersCount,
      //     completed: completedOrdersCount,
      //     rejected: rejectedOrdersCount,
      //   },
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

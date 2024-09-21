import { CheckoutData, OrderItem, PaymentDetails } from "@/types";
import mongoose, { Schema, Model } from "mongoose";
import { addressSchema } from "./address.modal";

const OrderItemSchema = new Schema<OrderItem>({
  productId: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

const PaymentDetailsSchema = new Schema<PaymentDetails>({
  method: { type: String, required: true },
  status: { type: String, required: true },
  transactionId: { type: String },
});

const CheckoutSchema: Schema<CheckoutData> = new Schema(
  {
    userId: { type: String, required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    paymentDetails: PaymentDetailsSchema,
    shippingAddress: addressSchema,
    billingAddress: addressSchema,
    status: { type: String, default: "processing" },
    orderId: { type: String, required: true },
  },
  { timestamps: true }
);

const Checkout: Model<CheckoutData> =
  mongoose.models.Checkout ||
  mongoose.model<CheckoutData>("Checkout", CheckoutSchema);

export default Checkout;

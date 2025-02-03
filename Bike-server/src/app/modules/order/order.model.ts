import { model, Schema } from "mongoose";
import { Torder } from "./order.interface";

const OrderSchema = new Schema<Torder>(
  {
    productName: {
      type: String,
      required: true,
    },
    productModel: {
      type: String,
      enum: ["Sport", "Cruiser", "Touring"],
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

const Order = model<Torder>("Order", OrderSchema);

export default Order;

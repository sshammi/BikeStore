/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { Torder } from "./order.interface";
import Order from "./order.model";
import { v4 as uuidv4 } from 'uuid';
import { orderUtils } from "./order.utils";

// Create a new order
const createOrder = async (orderData: Torder,client_ip:string) => {
  let order = await Order.create(orderData);

  const shurjopayPayload = {
    amount: orderData.price,
    order_id: uuidv4(),
    currency: "BDT",
    customer_name: orderData.customerName,
    customer_address:orderData.address,
    customer_email: orderData.customerEmail,
    customer_phone: orderData.phoneNumber,
    customer_city: "N/A",
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
     order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};
//verify
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};
// Get all orders with filtering, sorting, and pagination
const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
};

// Get a single order by ID
const getOrderById = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return order;
};

// Update an order by ID
const updateOrder = async (orderId: string, updateData: Partial<Torder>) => {
  const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
  if (!updatedOrder) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return updatedOrder;
};

// Delete an order by ID
const deleteOrder = async (orderId: string) => {
  const deletedOrder = await Order.findByIdAndDelete(orderId);
  if (!deletedOrder) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return deletedOrder;
};


const getOrdersByEmail = async (email: string) => {
  const orders = await Order.find({ customerEmail: email });
  if (!orders.length) {
    throw new AppError(StatusCodes.NOT_FOUND, "No orders found for this email");
  }
  return orders;
};

// Export services
export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  verifyPayment,
  getOrdersByEmail,
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleOrderQuery, useUpdateOrderMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { toast } from "sonner";

const ViewOrder = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const { data: order, isLoading, isError } = useGetSingleOrderQuery(id);
  console.log(order);
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const [status, setStatus] = useState(order?.status || "Pending");

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateOrder({ id, data: { status: newStatus } }).unwrap();
      setStatus(newStatus);
      toast.success("Order status updated successfully!");
      navigate('/dashboard-admin/orders');
    } catch (error) {
      toast.error("Failed to update order status.");
    }
  };

  if (isLoading) return <div className="text-center p-6">Loading order details...</div>;
  if (isError) return <div className="text-center text-red-500 p-6">Failed to fetch order details.</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center sm:text-left">Order Details</h2>

      <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
        <p><strong>Product Name:</strong> {order.data.productName}</p>
        <p><strong>Product Model:</strong> {order.data.productModel}</p>
        <p><strong>Quantity:</strong> {order.data.quantity}</p>
        <p><strong>Price:</strong> ${order.data.price}</p>
        <p><strong>Customer Name:</strong> {order.data.customerName}</p>
        <p><strong>Email:</strong> {order.data.customerEmail}</p>
        <p><strong>Phone Number:</strong> {order.data.phoneNumber}</p>
        <p><strong>Transaction ID:</strong> {order.data.transaction.id}</p>
        <p><strong>Transaction Status:</strong> {order.data.transaction.transactionStatus}</p>

        {/* Order Status Update */}
        <div className="mt-4">
          <label className="font-semibold">Update Order Status:</label>
          <select
            className="block w-full p-2 mt-2 border rounded"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Shipped">Shipped</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Status Update Loading */}
        {isUpdating && <p className="text-blue-500 mt-2">Updating status...</p>}
      </div>
    </div>
  );
};

export default ViewOrder;

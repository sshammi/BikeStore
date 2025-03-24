/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { useGetMyOrderQuery} from "@/redux/features/auth/authApi";

const CustomerOrders = () => {
  const { data: orderResponse, isLoading, isError } = useGetMyOrderQuery({});
  const orders = orderResponse?.data || [];
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-gray-500" size={48} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AlertCircle className="text-red-500" size={48} />
        <p className="text-lg text-red-600 ml-2">Failed to load orders</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders?.length ? (
        orders.map((order: any) => (
          <Card key={order._id} className="mb-4 shadow-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
              <p className="text-gray-700">Status: {order.status}</p>
              <p className="text-gray-700">Total Price: ${order.price}</p>
              <p className="text-gray-700">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default CustomerOrders;

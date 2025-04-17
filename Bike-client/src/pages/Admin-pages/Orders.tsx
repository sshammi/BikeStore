/* eslint-disable @typescript-eslint/no-unused-vars */
import {useDeleteOrderMutation,useGetAllOrdersQuery} from "@/redux/features/auth/authApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { TQueryParam } from "@/types/global";
import { Torder } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";

const Orders = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: ordersResponse, isLoading, isError } = useGetAllOrdersQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  const tableData =
    ordersResponse?.data?.map(
      ({
        _id,
        productName,
        productModel,
        quantity,
        price,
        customerName,
        customerEmail,
        status,
        transaction: { id },
      }: Torder) => ({
        key: _id,
        productName,
        productModel,
        quantity,
        price,
        customerName,
        customerEmail,
        status,
        orderId: id, // Corrected `transaction.id`
      })
    ) || [];

  const navigate = useNavigate();
  const [deleteOrder] = useDeleteOrderMutation();

  if (isLoading) {
    return <div className="text-center p-6"><Skeleton className="w-[100px] h-[20px] rounded-full" /></div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 p-6">Error fetching orders</div>;
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id);
      toast.success("Order deleted successfully!");
    } catch (error) {
      toast.error("Error deleting order.");
    }
  };

  const handleViewOrder = async (id: string) => {
    navigate(`/dashboard-admin/viewOrder/${id}`)
  };

  return (
    <div className="container mx-auto p-14">
      <h2 className="text-lg sm:text-xl font-bold text-center sm:text-left">Order List</h2>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto mt-4">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Product Model</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price ($)</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Customer Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((order) => (
              <TableRow key={order.key} className="text-sm sm:text-base">
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.productModel}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.customerEmail}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="flex flex-col sm:flex-row gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded w-full sm:w-auto"
                    onClick={() => handleViewOrder(order.key)} // Corrected
                  >
                    Vierfy
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded w-full sm:w-auto"
                    onClick={() => handleDelete(order.key)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;

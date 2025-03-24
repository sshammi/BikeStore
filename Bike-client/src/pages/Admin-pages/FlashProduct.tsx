/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAllBikesQuery, useDeleteBikeMutation, useGetFlashBikesQuery } from "@/redux/features/auth/authApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { TBike } from "@/types/user";
import { TQueryParam } from "@/types/global";
import { Skeleton } from "@/components/ui/skeleton";

const FlashProducts = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: bikesResponse, isLoading, isError } = useGetFlashBikesQuery({});

  const tableData = bikesResponse?.data?.map(
    ({ _id, name, brand, price, model, category, stock ,image}: TBike) => ({
      key: _id,
      name,
      brand,
      price,
      model,
      category,
      stock,
      image
    })
  ) || [];

  const navigate = useNavigate();
  const [deleteBike] = useDeleteBikeMutation();

  if (isLoading) {
    return <div className="text-center p-6"><Skeleton className="w-[100px] h-[20px] rounded-full" /></div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 p-6">Error fetching products</div>;
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteBike(id);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product.");
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/dashboard-admin/edit-product/${id}`);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-lg sm:text-xl font-bold">Product List</h2>
      </div>

      {/* Responsive Table Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
     {tableData.map((bike) => (
    <div
      key={bike.key}
      className="border rounded-lg shadow-md p-4 flex flex-col gap-2"
    >
      <img
        src={bike.image} // Make sure `bike.image` contains a valid image URL
        alt={bike.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold">{bike.name}</h3>
      <p className="text-gray-600">Brand: {bike.brand}</p>
      <p className="text-gray-600">Price: ${bike.price}</p>
      <p className="text-gray-600">Model: {bike.model}</p>
      <p className="text-gray-600">Category: {bike.category}</p>
      <p className="text-gray-600">Stock: {bike.stock}</p>

      <div className="flex gap-2 mt-2">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded w-full"
          onClick={() => handleEdit(bike.key)}
        >
          RemoveFromFlashSale
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default FlashProducts;
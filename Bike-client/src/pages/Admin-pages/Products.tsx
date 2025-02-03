/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAllBikesQuery, useDeleteBikeMutation } from "@/redux/features/auth/authApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { TBike } from "@/types/user";
import { TQueryParam } from "@/types/global";

const Products = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: bikesResponse, isLoading, isError } = useGetAllBikesQuery([
    { name: 'page', value: page },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  const tableData = bikesResponse?.data?.map(
    ({ _id, name, brand, price, model, category, stock }: TBike) => ({
      key: _id,
      name,
      brand,
      price,
      model,
      category,
      stock,
    })
  ) || [];

  const navigate = useNavigate();
  const [deleteBike] = useDeleteBikeMutation();

  if (isLoading) {
    return <div className="text-center p-6">Loading...</div>;
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

  const handleAddProduct = () => {
    navigate('/dashboard-admin/add-product');
  };

  const handleEdit = (id: string) => {
    navigate(`/dashboard-admin/edit-product/${id}`);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-lg sm:text-xl font-bold">Product List</h2>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded w-40"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto mt-4">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price ($)</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((bike) => (
              <TableRow key={bike.key} className="text-sm sm:text-base">
                <TableCell>{bike.name}</TableCell>
                <TableCell>{bike.brand}</TableCell>
                <TableCell>{bike.price}</TableCell>
                <TableCell>{bike.model}</TableCell>
                <TableCell>{bike.category}</TableCell>
                <TableCell>{bike.stock}</TableCell>
                <TableCell className="flex flex-col sm:flex-row gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded w-full sm:w-auto"
                    onClick={() => handleEdit(bike.key)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded w-full sm:w-auto"
                    onClick={() => handleDelete(bike.key)}
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

export default Products;

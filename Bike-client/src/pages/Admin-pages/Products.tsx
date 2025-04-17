/* eslint-disable @typescript-eslint/no-unused-vars */

import { useGetAllBikesQuery, useDeleteBikeMutation } from "@/redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { TBike } from "@/types/user";
import { TQueryParam } from "@/types/global";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

const Products = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: bikesResponse, isLoading, isError } = useGetAllBikesQuery([
    { name: 'page', value: page },
    { name: 'limit', value: 8 },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  const totalPage = bikesResponse?.meta?.totalPage || 1;

  const tableData = bikesResponse?.data?.map(
    ({ _id, name, brand, price, model, category, stock, image }: TBike) => ({
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

  if (isLoading) {
    return <div className="text-center p-6"><Skeleton className="w-[100px] h-[20px] rounded-full" /></div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 p-6">Error fetching products</div>;
  }

  return (
    <div className="container mx-auto p-14">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-lg sm:text-xl font-bold">Product List</h2>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded w-40"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {tableData.map((bike) => (
          <div
            key={bike.key}
            className="border rounded-lg shadow-md p-4 flex flex-col gap-2"
          >
            <img
              src={bike.image}
              alt={bike.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold">{bike.name}</h3>
            <p className="text-gray-600">Brand: {bike.brand}</p>
            <p className="text-gray-600">Price: {bike.price} BDT</p>
            <p className="text-gray-600">Model: {bike.model}</p>
            <p className="text-gray-600">Category: {bike.category}</p>
            <p className="text-gray-600">Stock: {bike.stock}</p>

            <div className="flex gap-2 mt-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded w-full"
                onClick={() => handleEdit(bike.key)}
              >
                Edit
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded w-full"
                onClick={() => handleDelete(bike.key)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPage > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent className="flex items-center gap-4">
              <PaginationItem>
                <PaginationPrevious
                  aria-disabled={page <= 1}
                  className={`px-4 py-2 rounded-lg ${
                    page <= 1
                      ? "pointer-events-none opacity-50 bg-gray-300 rounded-xl"
                      : "bg-[#205781] text-white hover:bg-blue-600 rounded-xl"
                  }`}
                  onClick={() => page > 1 && setPage((prev) => prev - 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <p className="px-4">Page {page} of {totalPage}</p>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  aria-disabled={page >= totalPage}
                  className={`px-4 py-2 rounded-lg ${
                    page >= totalPage
                      ? "pointer-events-none opacity-50 bg-gray-300 rounded-xl"
                      : "bg-[#205781] text-white hover:bg-blue-600 rounded-xl"
                  }`}
                  onClick={() => page < totalPage && setPage((prev) => prev + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Products;

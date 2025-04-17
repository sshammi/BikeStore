import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetModelBikesQuery } from "@/redux/features/auth/authApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ModelPage() {
  const { model } = useParams<{ model: string }>();
  const navigate = useNavigate();

  const { data: modelData, error, isLoading } = useGetModelBikesQuery(model);

  const products = modelData?.data || [];
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedBikes = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">Error loading products</div>;

  return (
    <div className="pt-20 mx-[10%]">
      <h2 className="text-3xl font-bold py-10 text-center">{model} Bikes</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found for this model.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBikes.map((product) => (
              <Card key={product._id} className="flex flex-col justify-between overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover mb-4"
                  />
                  <div className="bg-[#F9F9F9]">
                    <h4 className="text-lg font-bold pt-5 px-4">{product.name}</h4>
                    <p className="font-semibold text-md px-4 text-gray-700">
                      BDT {product.price}
                    </p>
                    <p className="text-sm text-gray-600 px-4 py-2">
                      Discover unmatched performance and comfort with the {product.name}, perfect for urban and off-road rides alike.
                    </p>
                    <div className="flex justify-center">
                      <Button
                        className="w-2/3 border border-[#00857A] bg-white hover:bg-gray-50 text-[#00857A] my-4 rounded-xl"
                        onClick={() => navigate(`/product-details/${product._id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-10 flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                <PaginationItem className="flex items-center px-4 font-medium">
                  Page {page} of {totalPages}
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { useGetAllBikesQuery } from "@/redux/features/auth/authApi";
import { TQueryParam } from "@/types/global";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function FilterProductsPage() {
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [category, setCategory] = useState(""); // Selected category
  const [brand, setBrand] = useState(""); // Selected brand
  const [model, setModel] = useState(""); // Selected model
  const [page, setPage] = useState(1); // Current page
  const navigate = useNavigate();
  
  const [params, setParams] = useState<TQueryParam[]>([
    { name: "page", value: page },
    { name: "limit", value: 6 },
    { name: "sort", value: "id" },
  ]);
  const handleViewDetails = (product) => {
    navigate(`/product-details/${product._id}`);
  };

  const { data: bikesResponse, isLoading, isError } = useGetAllBikesQuery(params);

  useEffect(() => {
    const newParams: TQueryParam[] = [
      { name: "page", value: page },
      { name: "limit", value: 6 },
      { name: "sort", value: "id" },
      ...category && [{ name: "category", value: category }],
      ...brand && [{ name: "brand", value: brand }],
      ...model && [{ name: "model", value: model }],
    ];
    setParams(newParams); // Update query parameters based on filters
  }, [category, brand, model, page]);

useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("bikeFilters") || "{}");
    console.log(savedFilters);
    if(savedFilters=="Superbike" || savedFilters=="Adventure" || savedFilters=="Commuter")
    {
      setCategory(savedFilters);
    }       
    if(savedFilters=="Honda" || savedFilters=="Yamaha" || savedFilters=="Kawasaki")
         setBrand(savedFilters|| "");
    if(savedFilters=="Sport" || savedFilters=="Cruiser" || savedFilters=="Touring")
         setModel(savedFilters|| "");
  }, []);
  
  if (isLoading) return <p><Skeleton className="w-[100px] h-[20px] rounded-full" /></p>;
  if (isError) return <p>Error fetching products.</p>;

  const products = bikesResponse?.data || [];
  const metaData = bikesResponse?.meta;
  const totalPage = metaData?.totalPage || 1;
  console.log(products);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-9">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product._id} className="bg-slate-100">
              <CardContent className="p-4">
                {/* Display product image */}
                <img
                  src={product.image} // Ensure product.image contains a valid URL
                  alt={product.name}
                  className="w-full h-30 object-cover rounded-md mb-2"
                />
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                <p className="text-sm text-gray-500">Model: {product.model}</p>
                <p className="text-lg font-bold">${product.price}</p>
                <p className="text-sm">Category: {product.category}</p>
                <p className={`text-sm ${Number(product.stock) > 0 ? "text-green-500" : "text-red-500"}`}>
                  {Number(product.stock) > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <Button className="mt-2 bg-[#205781] rounded-xl" onClick={() => handleViewDetails(product)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={page <= 1}
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                onClick={() => page > 1 && setPage((prev) => prev - 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <p className="px-4">Page {page || 1} of {totalPage}</p>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                aria-disabled={page >= totalPage}
                className={page >= totalPage ? "pointer-events-none opacity-50" : ""}
                onClick={() => page < totalPage && setPage((prev) => prev + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

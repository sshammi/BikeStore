import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { useGetAllBikesQuery } from "@/redux/features/auth/authApi";
import { TQueryParam } from "@/types/global";
import { useNavigate } from "react-router-dom";

export default function AllProductsPage() {
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

  const handleSearch = (value: string) => {
    setSearchTerm(value); // Update the search term as the user types
    setPage(1); // Reset to page 1 whenever the search changes
  };

  const handleFilterChange = (filterName: string, value: string) => {
    if (filterName === "category") setCategory(value);
    if (filterName === "brand") setBrand(value);
    if (filterName === "model") setModel(value);

    setPage(1); // Reset to page 1 on any filter change
  };

  if (isLoading) return <p>Loading...</p>;
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

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 py-6">
        <Input
          placeholder="Search by name, brand, or category"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)} // Update search term
        />

        <Select value={category} onValueChange={(value) => handleFilterChange("category", value)}>
          <SelectTrigger className="w-full">{category || "Select Category"}</SelectTrigger>
          <SelectContent>
            <SelectItem value="Superbike">Superbike</SelectItem>
            <SelectItem value="Adventure">Adventure</SelectItem>
            <SelectItem value="Commuter">Commuter</SelectItem>
          </SelectContent>
        </Select>

        <Select value={brand} onValueChange={(value) => handleFilterChange("brand", value)}>
          <SelectTrigger className="w-full">{brand || "Select Brand"}</SelectTrigger>
          <SelectContent>
            <SelectItem value="Honda">Honda</SelectItem>
            <SelectItem value="Yamaha">Yamaha</SelectItem>
            <SelectItem value="Kawasaki">Kawasaki</SelectItem>
          </SelectContent>
        </Select>

        <Select value={model} onValueChange={(value) => handleFilterChange("model", value)}>
          <SelectTrigger className="w-full">{model || "Select Model"}</SelectTrigger>
          <SelectContent>
            <SelectItem value="Sport">Sport</SelectItem>
            <SelectItem value="Cruiser">Cruiser</SelectItem>
            <SelectItem value="Touring">Touring</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <Button className="mt-2 bg-gray-800" onClick={() => handleViewDetails(product)}>
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

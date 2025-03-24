import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { useGetAllBikesQuery } from "@/redux/features/auth/authApi";
import { TQueryParam } from "@/types/global";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllProductsPage() {
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [category, setCategory] = useState(""); // Selected category
  const [brand, setBrand] = useState(""); // Selected brand
  const [model, setModel] = useState(""); // Selected model
  const [page, setPage] = useState(1); // Current page
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<{ [key: string]: number }>({}); // Maintain ratings for each product

  const handleRating = (productId: string, selectedRating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: selectedRating, // Set rating for the specific product
    }));
  };

  const [params, setParams] = useState<TQueryParam[]>([
    { name: "page", value: page },
    { name: "limit", value: 9 },
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
    setSearchTerm(value); // Update search term as the user types
    setPage(1); // Reset to page 1 whenever the search changes
  };

  const handleFilterChange = (filterName: string, value: string) => {
    if (filterName === "category") setCategory(value);
    if (filterName === "brand") setBrand(value);
    if (filterName === "model") setModel(value);

    setPage(1); // Reset to page 1 on any filter change
  };

  if (isLoading) return <p><Skeleton className="w-[100px] h-[20px] rounded-full" /></p>;
  if (isError) return <p>Error fetching products.</p>;

  const products = bikesResponse?.data || [];
  const metaData = bikesResponse?.meta;
  const totalPage = metaData?.totalPage || 1;

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="p-6 flex gap-6 pt-8 min-h-screen">
      {/* Sidebar: Filters (Sticky) */}
      <div className="w-full md:w-1/4 lg:w-1/5 h-auto md:h-screen md:sticky md:top-0 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold m-6">Filters</h2>
        
        {/* Search Bar */}
        <Input
          placeholder="Search by name, brand, or category"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="mb-6"
        />
        
        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Category</h3>
          {['Superbike', 'Adventure', 'Commuter'].map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={category === cat}
                onChange={() => handleFilterChange('category', cat)}
              />
              <label>{cat}</label>
            </div>
          ))}
        </div>
        
        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Brand</h3>
          {['Honda', 'Yamaha', 'Kawasaki'].map((br) => (
            <div key={br} className="flex items-center gap-2">
              <input
                type="radio"
                name="brand"
                value={br}
                checked={brand === br}
                onChange={() => handleFilterChange('brand', br)}
              />
              <label>{br}</label>
            </div>
          ))}
        </div>
        
        {/* Model Filter */}
        <div>
          <h3 className="font-semibold mb-2">Model</h3>
          {['Sport', 'Cruiser', 'Touring'].map((mod) => (
            <div key={mod} className="flex items-center gap-2">
              <input
                type="radio"
                name="model"
                value={mod}
                checked={model === mod}
                onChange={() => handleFilterChange('model', mod)}
              />
              <label>{mod}</label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content: Products */}
      <div className="w-4/5 ">
  <h1 className="text-2xl font-bold mb-6 text-center">All Products</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <Card key={product._id} className="bg-blue-50">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500">Model: {product.model}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <p className="text-sm">Category: {product.category}</p>
            <p
              className={`text-sm ${
                Number(product.stock) > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {Number(product.stock) > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {/* Rating */}
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={20}
                  className={`cursor-pointer ${
                    star <= (ratings[product._id] || 0)
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleRating(product._id, star)}
                />
              ))}
            </div>

            {/* View Details Button */}
            <Button
              className="mt-2 bg-[#205781] rounded-xl hover:bg-blue-600"
              onClick={() => handleViewDetails(product)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))
    ) : (
      <p className="text-center">No products found.</p>
    )}
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
                page <= 1 ? "pointer-events-none opacity-50 bg-gray-300 rounded-xl" : "bg-[#205781] text-white hover:bg-blue-600 hover:text-white rounded-xl"
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
                page >= totalPage ? "pointer-events-none opacity-50 bg-gray-300 rounded-xl" : "bg-[#205781] text-white hover:bg-blue-600 hover:text-white rounded-xl"
              }`}
              onClick={() => page < totalPage && setPage((prev) => prev + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )}
</div>

    </div>
  );
    

}

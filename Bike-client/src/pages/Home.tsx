/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useGetAllBikesQuery } from "@/redux/features/auth/authApi";
import { useGetAllHeroBikesQuery } from "@/redux/features/hero/heroApi";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import BenefitsSection from "@/commonHome/Benefit";
import Testimonials from "@/commonHome/Extra";
import FlashSale from "@/commonHome/FlashSale";
import CategorySection from "@/commonHome/Category";
import HeroBanner from "@/commonHome/Banner";
import FeatureBikeSection from "@/commonHome/FeaturesBike";
import BrowseBikeSection from "@/commonHome/BrowseBike";
import TrendingBanner from "@/commonHome/TrendingBanner";
import TrendingBikeSection from "@/commonHome/Trending";

const Home = () => {
  const [params, setParams] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [ratings, setRatings] = useState<{ [key: string]: number }>({}); // Maintain ratings for each product

  const handleRating = (productId: string, selectedRating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: selectedRating, // Set rating for the specific product
    }));
  };

  const { data: bikesResponse, isLoading, isError } = useGetAllBikesQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    { name: "limit", value: 6 },
    ...params,
  ]);

  const { data: herobikesResponse } = useGetAllHeroBikesQuery([]);
  const heroproducts = Array.isArray(herobikesResponse?.data) ? herobikesResponse.data : [];

  if (isLoading) return <p><Skeleton className="w-[100px] h-[20px] rounded-full" /></p>;

  if (isError) return <p>Error fetching products.</p>;

  const products = Array.isArray(bikesResponse?.data) ? bikesResponse.data : [];
  const handleViewDetails = (product) => {
    navigate(`/product-details/${product._id}`);
  };

  const featuredProducts = products.slice(0, 4); // Select first 6 products

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner */}
      <HeroBanner/>
      <FeatureBikeSection/>
      <BrowseBikeSection/>
      <TrendingBanner/>
      <TrendingBikeSection/>
      {/* Featured Products */}
      <section className="p-6">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => {
            const productRating = ratings[product._id] || 0; // Get product's rating from the ratings state or default to 0
            return (
              <Card key={product._id} className=" shadow-lg rounded-xl bg-blue-50 overflow-hidden transition-transform hover:scale-105">
  <CardContent className="p-4 flex flex-col items-center">
    {/* Product Image */}
    <div className="w-full h-40 bg-gray-200 rounded-md overflow-hidden mb-3">
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
      )}
    </div>

    {/* Product Name & Price */}
    <h3 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h3>
    <p className="text-md font-medium text-blue-600 mt-1">${product.price}</p>

    {/* Star Rating */}
    <div className="flex mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={18}
          className={`cursor-pointer ${star <= productRating ? "text-yellow-500" : "text-gray-300"}`}
          onClick={() => handleRating(product._id, star)}
        />
      ))}
    </div>

    {/* View Details Button */}
    <Button className="mt-4 bg-[#205781] text-white w-[50%] py-2 rounded-xl shadow-md hover:bg-blue-600 transition-all" onClick={() => handleViewDetails(product)}>
      View Details
    </Button>
  </CardContent>
</Card>

            );
          })}
        </div>
        <div className="mt-4 text-center text-blue-700">
            <Link to="/products">View All</Link>
        </div>
      </section>
      <CategorySection/>
      <FlashSale/>

      {/* Extra Section */}
      
      <Testimonials/>
      <BenefitsSection/>
    </div>
  );
};

export default Home;

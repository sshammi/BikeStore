/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { useGetPopularBikesQuery, useGetTrendingBikesQuery, useGetUpcommingBikesQuery } from "@/redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { TBike } from "@/types/user";
import { ArrowRight } from "lucide-react";
import FlashSale from "./FlashSale";

export default function FeatureBikeSection() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"trending" | "popular" | "upcoming">("trending");
  const navigate = useNavigate();

  const { data: trendingResponse } = useGetTrendingBikesQuery({});
  const { data: popularResponse } = useGetPopularBikesQuery({});
  const { data: upcomingResponse } = useGetUpcommingBikesQuery({});

  const trendingData = trendingResponse?.data || [];
  const popularData = popularResponse?.data || [];
  const upcomingData = upcomingResponse?.data || [];

  const bikeDataMap = {
    trending: trendingData,
    popular: popularData,
    upcoming: upcomingData,
  };

  console.log(bikeDataMap);

  const toggleDrawer = (category: "trending" | "popular" | "upcoming") => {
    setSelectedCategory(category);
    setOpen(true);
  };

  return (
      <div className="p-6 mx-[15%]">
        <h2 className="text-2xl font-bold mb-4">Feature Bikes</h2>
        <div className="flex gap-4 border-b border-gray-300 pb-0">
    {["trending", "popular", "upcoming"].map((category) => {
      const isActive = selectedCategory === category;
      return (
        <button
          key={category}
          onClick={() => toggleDrawer(category as "trending" | "popular" | "upcoming")}
          className={`rounded-none px-4 border-b-2 transition-all duration-200
            ${isActive ? "border-[#00857A] text-[#00857A]" : "border-transparent text-black"}
          `}
        >
          {category.toUpperCase()}
        </button>
      );
    })}
        </div>
        <Drawer open={open} onOpenChange={setOpen}>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {bikeDataMap[selectedCategory]?.slice(0,3).map((bike: TBike) => (
                <Card key={bike._id} className="flex flex-col justify-between overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-56 object-cover mb-4"
                  />
                  <div className="bg-[#F9F9F9]">
                    <h4 className="text-lg font-bold pt-5 px-4">{bike.name}</h4>
                    <p className="font-semibold text-md px-4 text-gray-700">
                      BDT {bike.price}
                    </p>
                    <p className="text-sm text-gray-600 px-4 py-2">
                      Discover unmatched performance and comfort with the {bike.name}, perfect for urban and off-road rides alike.
                    </p>
                    <div className="flex justify-center">
                      <Button
                        className="w-2/3 border border-[#00857A] bg-white hover:bg-gray-50 text-[#00857A] my-4 rounded-xl"
                        onClick={() => navigate(`/product-details/${bike._id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>            
              ))}
            </div>
            
            <Link
    to={`/${selectedCategory}`} // Update this to match your route structure
    className="font-semibold my-4 text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
  >
    All {selectedCategory} bikes
    <ArrowRight className="h-4 w-5" /> {/* Adds some space between the text and the arrow */}
  </Link>
  
          </div>
        </Drawer>
        <FlashSale/>
        <h2 className="text-2xl font-bold mb-4 mt-8">Get Offers on Popular Bikes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {popularData?.map((bike: TBike) => (
                <Card key={bike._id} className="flex flex-col justify-between">
                  <CardContent className="p-0">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-32 object-cover px-4"
                    />
                    <div className="bg-[#F9F9F9]">
                     <h4 className="text-lg font-bold px-4 pt-6">{bike.name}</h4>
                     <p className="font-semibold text-md px-4">BDT {bike.price}</p>
                     <p className="text-sm text-gray-600 px-4 pb-4 pt-3">
                    Explore the ideal balance of performance and affordability. Limited-time deals available now.
                   </p>
                     <div className="border-b border-gray-300 pb-2 mx-4 mb-2"></div>
                     <p className="text-blue-600 text-sm font-semibold px-4 my-2">Get best Offer</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div> 
  );
}

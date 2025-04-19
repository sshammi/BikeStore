/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { useGetAllBikesQuery, useGetPopularBikesQuery, useGetTrendingBikesQuery, useGetUpcommingBikesQuery } from "@/redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { TBike } from "@/types/user";
import { ArrowRight } from "lucide-react";
import { useGetAllHeroBikesQuery } from "@/redux/features/hero/heroApi";

export default function TrendingBikeSection() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"scooters" | "mileage" | "sports">("scooters");

  const navigate = useNavigate();

  const { data: scooterResponse } = useGetAllHeroBikesQuery([]);
  const { data: mileageResponse } = useGetPopularBikesQuery({});
  const { data: sportsResponse } = useGetUpcommingBikesQuery({});
  const { data: bikesResponse, isLoading, isError } = useGetAllBikesQuery([]);

  const scooterData = scooterResponse?.data || [];
  const mileageData = mileageResponse?.data || [];
  const sportsData = sportsResponse?.data || [];

  // Map UI tabs to their respective API data
  const bikeDataMap: Record<"scooters" | "mileage" | "sports", TBike[]> = {
    scooters: scooterData,
    mileage: mileageData,
    sports: sportsData,
  };

  // Optional: Map UI label to actual backend category if filtering needed
  const categoryMap: Record<"scooters" | "mileage" | "sports", string> = {
    scooters: "Commuter",
    mileage: "Mileage",
    sports: "Superbike",
  };

  const toggleDrawer = (category: "scooters" | "mileage" | "sports") => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const bikesToShow = bikeDataMap[selectedCategory];
  const comparePairs: [TBike, TBike][] = [];
  if (!isLoading && !isError && bikesResponse?.data.length >= 6) {
    const topSix = bikesResponse.data.slice(0, 6);
    for (let i = 0; i < 6; i += 2) {
      comparePairs.push([topSix[i], topSix[i + 1]]);
    }
  }

  console.log(bikeDataMap);
  console.log(bikesToShow);
  return (
    <div className="p-6 mx-[15%]">
      <h2 className="text-2xl font-bold mb-4">Trending Bikes</h2>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-300 pb-0">
        {["scooters", "mileage", "sports"].map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => toggleDrawer(category as "scooters" | "mileage" | "sports")}
              className={`rounded-none px-4 border-b-2 transition-all duration-200 ${
                isActive ? "border-[#00857A] text-[#00857A]" : "border-transparent text-black"
              }`}
            >
              {category.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Drawer with bike cards */}
      <Drawer open={open} onOpenChange={setOpen}>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {bikesToShow?.slice(0,3).map((bike: TBike) => (
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

          {/* Link to All Bikes by Category */}
          <Link
            to={`/${selectedCategory}`}
            className="font-semibold my-4 text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            All {selectedCategory} bikes
            <ArrowRight className="h-4 w-5" />
          </Link>
        </div>
      </Drawer>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 py-10 border border-[#00857A] bg-[#ECF9F8] my-7 rounded-xl">
          <div className="flex flex-col">
          <p className="text-lg font-semibold">Go Green,Go Electric</p>
          <p className="text-sm">40+ Electric Bikes and Scooters</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <button className="px-16 py-1 border border-[#00857A] bg-white rounded-xl text-[#00857A] font-semibold">Electric Bike</button>
            <button className="px-12 py-1 border border-[#00857A] bg-white rounded-xl text-[#00857A] font-semibold">Electric Scooter</button>
          </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4">Compare Bikes</h3>
        {comparePairs.length === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparePairs.map(([bikeA, bikeB], idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <img
                  src={bikeA.image}
                  alt={bikeA.name}
                  className="w-32 h-24 rounded-md"
                />
                 <div className="flex items-center justify-center h-32">
  <div className="border-l-2 border-gray-400 h-full relative">
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-orange-600 text-xs font-semibold p-1 rounded-full border border-black">
      VS
    </span>
  </div>
</div>
                <img
                  src={bikeB.image}
                  alt={bikeB.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </div>
              <div className="flex justify-between text-left">
                <div>
                  <p className="text-sm font-semibold">{bikeA.name}</p>
                  <p className="text-sm text-gray-600">BDT {bikeA.price}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">{bikeB.name}</p>
                  <p className="text-sm text-gray-600">BDT {bikeB.price}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        )}
      </div>
    </div> 
  );
}

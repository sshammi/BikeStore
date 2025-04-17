/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";

export default function FeatureBikeSection() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"brand" | "budget" | "model">("brand");

  // Cloudinary setup for logos
  const cld = new Cloudinary({ cloud: { cloudName: "dlsfq2s3m" } });
  const honda = cld.image("Honda_Logo_yqe4p0").toURL();
  const yamaha = cld.image("yamaha-black-logo-png-image-701751694774658yftuzaicev-removebg-preview_mza0zh").toURL();
  const kawasaki = cld.image("kawasaki-logo-free-png-701751694711254up3hnwgg9p-removebg-preview_l7reyk").toURL();
  const sport = cld.image("images-removebg-preview_nohpnf").toURL();
  const cruiser = cld.image("71417_1521462363-removebg-preview_ypd3sb").toURL();
  const touring = cld.image("touring-and-adventure-motorcycle-logo-vector-removebg-preview_dultre").toURL();

  // Category data
  const brandData = [
    { name: "Honda", logo: honda },
    { name: "Yamaha", logo: yamaha },
    { name: "Kawasaki", logo: kawasaki },
  ];

  const modelData = [
    { name: "Sport", logo: sport },
    { name: "Cruiser", logo: cruiser },
    { name: "Touring", logo: touring },
  ];

  const budgetData = ["Under 50000", "Under 100000", "Under 150000"];

  const categoryDataMap = {
    brand: brandData,
    model: modelData,
    budget: budgetData,
  };

  const toggleDrawer = (category: "brand" | "budget" | "model") => {
    setSelectedCategory(category);
    setOpen(true);
  };

  return (
    <div className="p-6 mx-[15%]">
      <h2 className="text-2xl font-bold mb-4">Browse Bikes By</h2>
      <div className="flex gap-4 border-b border-gray-300">
        {["brand", "budget", "model"].map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => toggleDrawer(category as "brand" | "budget" | "model")}
              className={`rounded-none px-4 border-b-4 transition-all duration-200 ${
                isActive ? "border-[#00857A] text-[#00857A]" : "border-transparent text-black"
              }`}
            >
              {category.toUpperCase()}
            </button>
          );
        })}
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* For brand and model */}
            {selectedCategory === "brand" || selectedCategory === "model" ? (
              (categoryDataMap[selectedCategory] as { name: string; logo: string }[]).map((item) => (
                <Link to={`/${selectedCategory}s/${item.name}`} key={item.name}>
                  <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center gap-2">
                      <img src={item.logo} alt={`${item.name} logo`} className="h-16 object-contain" />
                      <span className="font-semibold text-lg">{item.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              // For budget category
              (categoryDataMap[selectedCategory] as string[]).map((item) => (
                <Link to={`/budgets/${item.replace(/\s+/g, "-").toLowerCase()}`} key={item}>
                  <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow h-40 flex items-center justify-center">
                    <CardContent className="p-2 flex items-center justify-center text-center font-semibold text-lg">
                      {item}
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

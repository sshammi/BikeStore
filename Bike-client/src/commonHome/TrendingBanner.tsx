import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TrendingBanner = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "dlsfq2s3m" } });
  const img = cld.image("get-final-price-banner_mrepfl").toURL();

  const [searchValue, setSearchValue] = useState("");

  return (
    <section className="relative mt-10">
  {/* Banner Image */}
  <img
    src={img}
    alt="Banner image"
    className="object-cover w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]"
  />

  {/* Gray overlay */}
  <div className="absolute inset-0 bg-black/30 z-10" />

  {/* Overlay content centered */}
  <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-10 md:px-16 lg:px-24 md:ml-36">
    <div className="bg-[#555555] w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 shadow-lg flex flex-col items-start gap-4 rounded-xl">
      <p className="text-white font-bold text-lg sm:text-xl md:text-2xl text-left">
        Check On-Road Price
      </p>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search bikes..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full text-black bg-white rounded-xl px-4 py-2"
      />

      {/* Modal Trigger */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-white text-gray-600 font-semibold w-full rounded-xl px-6 hover:bg-gray-200">
            Select City
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Select City</DialogTitle>
          </DialogHeader>
          <div>This is the modal content. You can customize it as needed.</div>
        </DialogContent>
      </Dialog>

      <p className="text-white text-sm text-left">
        Check the on-road price in your city
      </p>
    </div>
  </div>
</section>

  );
};

export default TrendingBanner;

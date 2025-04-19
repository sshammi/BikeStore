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
import { DialogClose } from "@radix-ui/react-dialog";

const TrendingBanner = () => {
  const cld = new Cloudinary({ cloud: { cloudName: "dlsfq2s3m" } });
  const img = cld.image("get-final-price-banner_mrepfl").toURL();

  const [searchValue, setSearchValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const cities = [
    "Dhaka",
    "Chattogram",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Rangpur",
    "Mymensingh",
  ];

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

          {/* Modal Trigger for city selection */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-gray-600 font-semibold w-full rounded-xl px-6 hover:bg-gray-200">
                {selectedCity}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg mb-4 text-center">
                  Select a City
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                {cities.map((city) => (
                  <DialogClose asChild key={city}>
                    <Button
                      variant="outline"
                      className="w-full justify-center text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedCity(city);
                        setTimeout(() => {
                          setShowConfirmation(true);
                        }, 300); // Delay to allow dialog to close
                      }}
                    >
                      {city}
                    </Button>
                  </DialogClose>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Confirmation modal after city selection */}
          <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
            <DialogContent className="bg-white max-w-sm text-center">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Thank You!
                </DialogTitle>
              </DialogHeader>
              <p className="text-gray-700 mt-2">
                A representative from <strong>{selectedCity}</strong> will contact you soon.
              </p>
              <Button
                className="mt-6 bg-[#205781] text-white hover:bg-blue-700"
                onClick={() => setShowConfirmation(false)}
              >
                OK
              </Button>
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

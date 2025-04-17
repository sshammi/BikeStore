import { Cloudinary } from "@cloudinary/url-gen";
import { Search } from "lucide-react";

const HeroBanner = () => {
  // Cloudinary Setup
  const cld = new Cloudinary({ cloud: { cloudName: "dlsfq2s3m" } });
  const img = cld.image("home-top-banner-4_uzqgkc").toURL();

  return (
    <section className="relative">
      {/* Banner Image */}
      <img
        src={img}
        alt="Banner image"
        className="w-full h-[500px] object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-4 space-y-3">
        <h1 className="text-3xl font-semibold">
          FIND THE RIGHT BIKE
        </h1>
        <h2 className="text-xl">Get Comprehensive Information on Bikes!
        </h2>
        <div className="w-full max-w-2xl relative">
  {/* Search Icon inside input */}
  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 z-10">
    <Search size={18} />
  </span>

  {/* Input field */}
  <input
    type="text"
    placeholder="Search bikes..."
    className="w-full pl-10 pr-28 py-3 rounded-xl text-black outline-none"
  />

  {/* Search Button absolutely positioned at the end */}
  <button className="absolute right-1 top-1 bottom-1 bg-[#E03012] hover:bg-orange-600 text-white font-semibold px-6 rounded-xl">
    Search
  </button>
</div>

      </div>
    </section>
  );
};

export default HeroBanner;

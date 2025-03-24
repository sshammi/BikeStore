
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Cloudinary } from "@cloudinary/url-gen";

const HeroBanner = () => {

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow onClick={undefined} />,
    nextArrow: <CustomNextArrow onClick={undefined} />,
  };

  // Cloudinary Setup
  const cld = new Cloudinary({ cloud: { cloudName: "dlsfq2s3m" } });
  const images = [
    cld.image("White_Orange_Black_Modern_New_Bike_Experience_Youtube_Thumbnail_itwrfo").toURL(),
    cld.image("bike-sale-poster-design-template_987701-1839_cwnzdu").toURL(),
    cld.image("Blue_and_Gold_Motorcycle_Reviews_YouTube_Thumbnail_clnnxa").toURL(),
  ];

  return (
    <section>
      {/* Slider */}
      <div className="relative w-full mx-auto px-6 mt-24">
        <Slider {...settings} className="rounded-xl overflow-hidden">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover rounded-xl"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 transform -translate-y-1/2  text-white p-2 z-10 hover:bg-gray-600 rounded-xl"
    onClick={onClick}
  >
    <FaChevronLeft size={20} />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 z-10 hover:bg-gray-600 rounded-xl"
    onClick={onClick}
  >
    <FaChevronRight size={20} />
  </button>
);

export default HeroBanner;

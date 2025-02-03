/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useGetAllBikesQuery } from "@/redux/features/auth/authApi";
import { TQueryParam } from "@/types/global";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const Home = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data: bikesResponse, isLoading, isError } = useGetAllBikesQuery([
    { name: 'page', value: page },
    { name: 'sort', value: 'id' },
    { name: 'limit', value: 6 },
    ...params,
  ]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching products.</p>;

  const products = Array.isArray(bikesResponse?.data) ? bikesResponse.data : [];
  const handleViewDetails = (product) => {
    navigate(`/product-details/${product._id}`);
  };
  // Select first 6 products
  const featuredProducts = products.slice(0, 6);
  const cld = new Cloudinary({ cloud: { cloudName: 'dlsfq2s3m' } });
  
  // Use this sample image or upload your own via the Media Explorer
  const img1 = cld.image('offer1_icyr3p').format('auto').quality('auto');
  const img2 = cld.image('offer2_jehcvs').format('auto').quality('auto');
  const img3 = cld.image('offer3_uhetub').format('auto').quality('auto');

  return (
    <div className="min-h-screen flex flex-col">

      {/* Banner */}
      <section className="mt-[80px] p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Special Offers</h2>
        <Carousel className="w-full h-[300px] sm:h-[350px] lg:h-[400px] flex items-center justify-center overflow-hidden relative">
          <CarouselContent className="w-full">
            <CarouselItem className="flex justify-center items-center">
              <AdvancedImage cldImg={img1} className="w-full h-full object-contain sm:h-[350px] lg:h-[400px]"/>
            </CarouselItem>
            <CarouselItem className="flex justify-center items-center">
              <AdvancedImage cldImg={img2} className="w-full h-full object-contain sm:h-[350px] lg:h-[400px]"/>
            </CarouselItem>
            <CarouselItem className="flex justify-center items-center">
            <AdvancedImage cldImg={img3} className="w-full h-full object-contain sm:h-[350px] lg:h-[400px]"/>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
            &lt;
          </CarouselPrevious>
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
            &gt;
          </CarouselNext>
        </Carousel>
      </section>

      {/* Featured Products */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProducts.map((product) => (
            <Card key={product._id} className="bg-stone-100">
              <CardContent className="p-4">
                {/* Display image from ImageBB URL */}
                <div className="h-30 bg-gray-300 mb-2">
                  {product.image ? (
                    <img
                      src={product.image} // Assuming 'imageUrl' contains the ImageBB URL
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">${product.price}</p>
                <Button className="mt-2 bg-gray-800" onClick={() => handleViewDetails(product)}>View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button asChild>
            <Link to="/products">View All</Link>
          </Button>
        </div>
      </section>

      {/* Extra Section */}
      <section className="bg-gray-100 p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">What Our Customers Say</h2>
        <p className="italic">"Best bike store! Excellent quality and service."</p>
      </section>


    </div>
  );
};

export default Home;

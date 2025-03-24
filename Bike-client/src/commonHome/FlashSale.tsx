"use client";

import { useEffect, useState } from "react";
import { useGetFlashBikesQuery } from "@/redux/features/auth/authApi";
import { TBike } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTimeLeft } from "@/utils/timeUtils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState(10 * 24 * 60 * 60); // 10 days in seconds
  const { data: bikesResponse, isLoading, isError } = useGetFlashBikesQuery({});
  const navigate = useNavigate();
  
  const tableData = bikesResponse?.data?.map(
    ({ _id, name, brand, price, model, category, stock, image }: TBike) => ({
      key: _id,
      name,
      brand,
      price,
      model,
      category,
      stock,
      image,
    })
  ) || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center p-6">
        <Skeleton className="w-[150px] h-[25px] rounded-full mb-4" />
        <Skeleton className="w-[300px] h-[200px] rounded-lg" />
      </div>
    );
  }
  if (isError) {
    return <div className="text-center text-red-500 p-6">❌ Error fetching products</div>;
  }

  const handleViewDetails = (product) => {
    navigate(`/product-details/${product.key}`);
  };

  return (
    <section className="bg-red-50 p-8 rounded-lg shadow-md text-center my-8 -m-10">
      <h2 className="text-3xl font-bold text-red-600 mb-4">🔥 Flash Sale</h2>
      <p className="text-lg text-gray-700 mb-6">
        Hurry! Limited-time offers end in:{" "}
        <span className="font-semibold text-red-500">{formatTimeLeft(timeLeft)}</span>
      </p>

      {tableData.length === 0 ? (
        <p className="text-gray-500">No flash sale products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tableData.map((product) => (
            <motion.div
              key={product.key}
              className="bg-white p-4 rounded-xl shadow-md cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.brand}</p>
              <p className="text-red-600 font-bold text-xl">${product.price}</p>
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => handleViewDetails(product)}
              >
                Buy Now
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FlashSale;

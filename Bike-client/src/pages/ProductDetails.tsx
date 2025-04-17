import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleBikeQuery } from "@/redux/features/auth/authApi";
import { addToCart } from "@/redux/features/card/cardSlice";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const { data: product, isLoading, isError } = useGetSingleBikeQuery(id);

  const handleRating = (productId: string, selectedRating: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: selectedRating,
    }));
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product.data._id,
        name: product.data.name,
        price: product.data.price,
        image: product.data.image,
        quantity: 1,
      })
    );
  };

  const handleBuyNow = (id: string) => {
    navigate(`/checkout/${id}`);
  };

  if (isLoading) {
    return <Skeleton className="w-full h-96 rounded-lg" />;
  }

  if (isError || !product || !product.data) {
    return <p className="text-center text-gray-500">Product not found.</p>;
  }

  const productRating = ratings[product.data._id] || 0;

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-10">
        {/* Product Image */}
        <div className="w-full">
          <img
            src={product.data.image}
            alt={product.data.name}
            className="w-full rounded-2xl object-cover max-h-[500px]"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.data.name}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Discover the perfect blend of style and performance with the <strong>{product.data.name}</strong>. Ideal for city commutes and long rides, this bike offers reliability, comfort, and an eye-catching design.
            </p>
          </div>

          {/* Details */}
          <div className="text-gray-700 space-y-2">
            <p><strong>Brand:</strong> {product.data.brand}</p>
            <p><strong>Model:</strong> {product.data.model}</p>
            <p><strong>Category:</strong> {product.data.category}</p>
            <p><strong>Stock:</strong> {product.data.stock > 0 ? `In Stock (${product.data.stock})` : "Out of Stock"}</p>
          </div>

          {/* Price */}
          <div className="text-2xl font-semibold text-blue-600">
            BDT {product.data.price}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer transition-all ${
                  star <= productRating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleRating(product.data._id, star)}
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">(Rate this product)</span>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Ergonomic design for comfort</li>
              <li>Durable frame with long-lasting performance</li>
              <li>Perfect for all terrains</li>
              <li>Low-maintenance components</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row pt-2 gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full md:w-1/4 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleBuyNow(product.data._id)}
              className="w-full md:w-1/4 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-semibold transition"
            >
              Buy Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="pt-6 text-sm text-gray-500 border-t mt-6">
            <p>✅ Free delivery within 3-5 business days</p>
            <p>🔁 7-day easy return policy</p>
            <p>🔒 Secure payment & checkout</p>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="max-w-6xl mx-auto mt-16 border-t pt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-[#00857A] p-4 rounded-xl">
            <p className="text-gray-800 font-semibold">Sadia Rahman</p>
            <p className="text-sm text-gray-500">⭐⭐⭐⭐⭐</p>
            <p className="text-gray-600 mt-2">
              I’ve been using this bike for a month — it’s super smooth and stylish. Would definitely recommend it for daily use.
            </p>
          </div>
          <div className="border border-[#00857A] p-4 rounded-xl">
            <p className="text-gray-800 font-semibold">Mehedi Hasan</p>
            <p className="text-sm text-gray-500">⭐⭐⭐⭐</p>
            <p className="text-gray-600 mt-2">
              Great value for the price. The performance is solid and the frame feels sturdy. A minor issue with seat comfort, though.
            </p>
          </div>
          <div className="border border-[#00857A] p-4 rounded-xl">
            <p className="text-gray-800 font-semibold">Wasif </p>
            <p className="text-sm text-gray-500">⭐⭐⭐⭐⭐</p>
            <p className="text-gray-600 mt-2">
              I’ve been using this bike for a month — it’s super smooth and stylish. Would definitely recommend it for daily use.
            </p>
          </div>
          <div className="border border-[#00857A] p-4 rounded-xl">
            <p className="text-gray-800 font-semibold">Niloy</p>
            <p className="text-sm text-gray-500">⭐⭐⭐⭐</p>
            <p className="text-gray-600 mt-2">
              Great value for the price. The performance is solid and the frame feels sturdy. A minor issue with seat comfort, though.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

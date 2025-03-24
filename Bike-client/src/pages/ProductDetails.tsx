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
  const [ratings, setRatings] = useState<{ [key: string]: number }>({}); // Maintain ratings for each product
  
  const handleRating = (productId: string, selectedRating: number) => {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [productId]: selectedRating, // Set rating for the specific product
      }));
  };
  const { data: product, isLoading, isError } = useGetSingleBikeQuery(id);

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

  if (isLoading) return <p><Skeleton className="w-[100px] h-[20px] rounded-full" /></p>;

  if (isError || !product || !product.data) return <p>Product not found.</p>;
  const productRating = ratings[product._id] || 0;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 pt-16">
      <div className="w-full max-w-lg rounded-lg  p-6 space-y-6">
        <div className="flex justify-center">
          <img
            src={product.data.image} // Make sure this matches your backend response
            alt={product.data.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center">{product.data.name}</h2>
        <div className="space-y-2">
          <p><strong>Brand:</strong> {product.data.brand}</p>
          <p><strong>Model:</strong> {product.data.model}</p>
          <p><strong>Category:</strong> {product.data.category}</p>
          <p><strong>Price:</strong> ${product.data.price}</p>
          <p><strong>Stock:</strong> {product.data.stock}</p>
        </div>
        <div className="flex mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                size={20}
                                className={`cursor-pointer ${star <= productRating ? "text-yellow-500" : "text-gray-400"}`}
                                onClick={() => handleRating(product._id, star)}
                              />
                            ))}
                          </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleAddToCart}
            className="bg-[#205781] text-white px-6 py-3 rounded-xl mt-4 hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <button
            onClick={() => handleBuyNow(product.data._id)}
            className="bg-[#205781] text-white px-6 py-3 rounded-xl mt-4 hover:bg-blue-600"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

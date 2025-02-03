import { useGetSingleBikeQuery } from "@/redux/features/auth/authApi";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useGetSingleBikeQuery(id);

  const handleBuyNow = (id: string) => {
    navigate(`/checkout/${id}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !product || !product.data) return <p>Product not found.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg border rounded-lg shadow-lg p-6 space-y-6">
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
          <p><strong>Description:</strong> {product.data.description}</p>
          <p><strong>Stock:</strong> {product.data.stock}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleBuyNow(product.data._id)}
            className="bg-gray-800 text-white px-6 py-3 rounded-lg w-full mt-4"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

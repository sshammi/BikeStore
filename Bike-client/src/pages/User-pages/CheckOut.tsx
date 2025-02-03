import { Button } from "@/components/ui/button";
import { useAddOrderMutation, useGetSingleBikeQuery } from "@/redux/features/auth/authApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetSingleBikeQuery(id);
  const user = useSelector((state: RootState) => state.auth.user);

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("surjopay");
  const [customerName, setCustomerName] = useState(""); // Customer name state
  const [email, setEmail] = useState(""); // Customer email state
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone number state
  const [address, setAddress] = useState(""); // Address state

  const [addOrder] = useAddOrderMutation(); // Mutation for submitting order

  // Automatically set the email if the user is logged in
  useEffect(() => {
    if (user) {
      setEmail(user.email); // Set email from the logged-in user
    }
  }, [user]);

  // Ensure quantity does not exceed stock
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(parseInt(e.target.value) || 1, product?.data?.stock || 1));
    setQuantity(value);
  };

  // Calculate total price
  const totalPrice = product?.data?.price * quantity;

  // Handle order submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   

    // Prepare order data
    const orderData = {
      productName: product?.data?.name,
      productModel: product?.data?.model,
      quantity: quantity.toString(),
      price: totalPrice.toString(),
      customerName: customerName,
      customerEmail: email,
      phoneNumber: phoneNumber, // Added phone number to order data
      address: address, // Added address to order data
    };
    console.log(orderData);
    try {
      // Send order data to backend
      const response = await addOrder(orderData).unwrap();
      toast.success("Order placed successfully!");

      // Check if response contains the URL for redirection
      if (response?.data?.result) {
        window.location.href = response.data.result;
      } else {
        toast.error("Payment URL not found.");
      }
      console.log(response);
    } catch (error) {
      console.error("Order submission failed:", error);
    
      // Check if error response exists and display the error message
      if (error?.data?.message) {
        toast.error(`Failed to place order: ${error.data.error.message}`);
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    }    
  };

  if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center min-h-screen">There was an error fetching the product details.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      {product && (
        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg w-full max-w-lg">
          {/* Product Image */}
          <div className="w-full flex justify-center mb-6">
            <img src={product.data.image} alt={product.data.name} className="w-64 h-64 object-contain rounded-lg border" />
          </div>

          {/* Product Details */}
          <div className="bg-gray-100 p-4 rounded-lg w-full text-center">
            <h2 className="text-2xl font-bold">{product.data.name}</h2>
            <p className="text-sm text-gray-500">Stock: {product.data.stock}</p>
            <p className="text-lg font-semibold">${product.data.price} per unit</p>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit} className="mt-6 w-full">
            <h3 className="text-lg font-semibold mb-3">Order Details</h3>

            {/* Customer Name */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter your address"
                required
              />
            </div>

            {/* Customer Email */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                readOnly // Disable editing for email
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Email (Auto-filled)"
              />
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                min={1}
                max={product.data.stock}
                required
              />
            </div>

            {/* Total Price */}
            <p className="text-lg font-semibold mb-3">Total Amount: ${totalPrice}</p>

            {/* Payment Method */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Payment Method</label>
              <select
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="surjopay">SurjoPay</option>
              </select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gray-800 text-white"
              disabled={product.data.stock < 1}
            >
              {product.data.stock > 0 ? "Order Now" : "Out of Stock"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
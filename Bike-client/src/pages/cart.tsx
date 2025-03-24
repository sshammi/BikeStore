import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMemo } from "react";
import { clearCart, removeFromCart } from "@/redux/features/card/cardSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Calculate total price
    const totalPrice = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    const handleBuyNow = (id: string) => {
        navigate(`/checkout/${id}`);
      };
    return (
        <div className="min-h-screen p-10">
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {/* Cart Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cartItems.map((item) => (
                            <div key={item._id} className="border p-4 rounded-lg shadow-lg flex flex-col">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <h3 className="text-lg font-medium mt-2">{item.name}</h3>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <div className=" flex justify-center gap-4 mt-3">
                                <button
                                    onClick={() => dispatch(removeFromCart(item._id))}
                                    className="bg-red-500 text-white px-3 py-1 rounded mt-2 "
                                >
                                    Remove
                                </button>
                                <button
                                    onClick={() =>handleBuyNow(item._id)}
                                    className="bg-gray-800 text-white px-3 py-1 rounded mt-2 "
                                >
                                    Buy Now
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Actions */}
                    <div className="mt-8 flex flex-col items-center md:justify-center md:gap-6">
                        <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="bg-gray-700 text-white px-6 py-2 rounded-lg"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default CartPage;

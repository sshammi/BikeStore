/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { FaBicycle } from 'react-icons/fa';
import { FiMenu, FiX } from "react-icons/fi";// Using lucide-react for the cart icon
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilter(value);
    localStorage.setItem("bikeFilters", JSON.stringify(value)); // Store in localStorage
    navigate(`/filterProduct`);
  };
  // Access auth state from Redux store
  const { user } = useSelector((state: RootState) => state.auth);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Handle logout functionality
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDashboard = () => {
    if (user?.role === "admin") {
      navigate("/dashboard-admin");
    } else if (user?.role === "customer") {
      navigate("/dashboard-user");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-[#205781] text-white p-4 px-10 fixed w-full z-50 top-0 shadow-lg">
        {/* Logo */}
        <div className="flex items-center space-x-3 w-1/4">
          <FaBicycle className="text-white h-10 w-10" /> {/* Bike icon with white color */}
          <Link to="/" className="text-xl font-bold text-white">
            BikeStore
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-end w-full">
           <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>


        {/* Mobile Menu Links */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-[#205781] text-white p-4 space-y-4 ${isMobileMenuOpen ? "block" : "hidden"
            }`}
        >
          <Link to="/" className="block" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="block" onClick={() => setIsMobileMenuOpen(false)}>
            Products
          </Link>
          <Link to="/about" className="block" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="block" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>
          <div className="flex justify-center items-center w-full text-gray-800">
            <Select onValueChange={(value) => handleFilterChange("all", value)}>
              <SelectTrigger className="w-full bg-white rounded-xl">Select an Option</SelectTrigger>
              <SelectContent >
                {/* Categories */}
                <div className="px-4 py-2 text-gray-500 font-semibold">Categories</div>
                <SelectItem value="Superbike">Superbike</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
                <SelectItem value="Commuter">Commuter</SelectItem>

                {/* Brands */}
                <div className="px-4 py-2 text-gray-500 font-semibold mt-2">Brands</div>
                <SelectItem value="Honda">Honda</SelectItem>
                <SelectItem value="Yamaha">Yamaha</SelectItem>
                <SelectItem value="Kawasaki">Kawasaki</SelectItem>

                {/* Models */}
                <div className="px-4 py-2 text-gray-500 font-semibold mt-2">Models</div>
                <SelectItem value="Sport">Sport</SelectItem>
                <SelectItem value="Cruiser">Cruiser</SelectItem>
                <SelectItem value="Touring">Touring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Authentication Buttons */}
          <div className="space-y-4 text-center">
            {user ? (
              <>
                <Link to="/cart" className="text-white relative">
                <div className="flex">

            <ShoppingCart className="text-white h-6 w-8" />
            Cart ({cartItems.length})
                </div>
          </Link>
                <Button className="w-full bg-white text-gray-800 rounded-2xl" variant="outline" onClick={handleDashboard}>
                  {user.role === "admin" ? "Admin Dashboard" : "Customer Dashboard"}
                </Button>
                <Button className="w-full bg-white text-gray-800 rounded-2xl" variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full bg-white text-gray-800 rounded-2xl" variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button className="w-full bg-white text-gray-800 rounded-2xl" variant="outline" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center w-2/4 justify-center">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <div className="flex justify-center items-center w-60 bg-white text-gray-800 rounded-xl">
            <Select onValueChange={(value) => handleFilterChange("all", value)}>
              <SelectTrigger className="w-60 rounded-xl">Select an Option</SelectTrigger>
              <SelectContent>
                {/* Categories */}
                <div className="px-4 py-2 text-gray-500 font-semibold">Categories</div>
                <SelectItem value="Superbike">Superbike</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
                <SelectItem value="Commuter">Commuter</SelectItem>

                {/* Brands */}
                <div className="px-4 py-2 text-gray-500 font-semibold mt-2">Brands</div>
                <SelectItem value="Honda">Honda</SelectItem>
                <SelectItem value="Yamaha">Yamaha</SelectItem>
                <SelectItem value="Kawasaki">Kawasaki</SelectItem>

                {/* Models */}
                <div className="px-4 py-2 text-gray-500 font-semibold mt-2">Models</div>
                <SelectItem value="Sport">Sport</SelectItem>
                <SelectItem value="Cruiser">Cruiser</SelectItem>
                <SelectItem value="Touring">Touring</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
        </div>

        <div className="hidden md:flex space-x-4 items-center w-1/4 justify-end">
          {user ? (
            <>
              <Link to="/cart" className="text-white relative">
            <ShoppingCart className="text-white h-6 w-8" />
            Cart ({cartItems.length})
          </Link>
              <Button
                className="bg-white text-gray-800 text-base py-2 px-4 rounded-2xl"
                variant="outline"
                onClick={handleDashboard}
              >
                {user.role === 'admin' ? 'Admin Dashboard' : 'Customer Dashboard'}
              </Button>
              <Button
                className="bg-white text-gray-800 text-base py-2 px-4 rounded-2xl"
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className="bg-white text-gray-800 text-base py-2 px-4 rounded-2xl"
                variant="outline"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                className="bg-white text-gray-800 text-base py-2 px-4 rounded-2xl"
                variant="outline"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

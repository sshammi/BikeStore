/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { Cloudinary } from "@cloudinary/url-gen";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { ShoppingCart, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const { user } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const cld = new Cloudinary({ cloud: { cloudName: "dlsfq2s3m" } });
  const img = cld.image("bikeStoreLogo_bnx9pp").toURL();

  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilter(value);
    localStorage.setItem("bikeFilters", JSON.stringify(value));
    navigate(`/filterProduct`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-white p-4 px-10 fixed w-full z-50 top-0 shadow-md">
        {/* Logo */}
        <div className="md:w-1/4">
        <Link to="/">
         <img
          src={img}
          alt="Banner image"
          className="w-48 h-10 object-cover"
         />
        </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-end w-full">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-white p-4 space-y-4 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/products" className="block text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>
            Products
          </Link>
          <Link to="/about" className="block text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="block text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>

          <div className="flex justify-center items-center w-full text-gray-800">
            <Select onValueChange={(value) => handleFilterChange("all", value)}>
              <SelectTrigger className="w-full bg-white rounded-xl">
                Select an Option
              </SelectTrigger>
              <SelectContent>
                <div className="px-4 py-2 text-gray-500 font-semibold">Categories</div>
                <SelectItem value="Superbike">Superbike</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
                <SelectItem value="Commuter">Commuter</SelectItem>

                <div className="px-4 py-2 text-gray-500 font-semibold mt-2">Brands</div>
                <SelectItem value="Honda">Honda</SelectItem>
                <SelectItem value="Yamaha">Yamaha</SelectItem>
                <SelectItem value="Kawasaki">Kawasaki</SelectItem>

                <div className="px-4 py-2 text-gray-500 font-semibold mt-2">Models</div>
                <SelectItem value="Sport">Sport</SelectItem>
                <SelectItem value="Cruiser">Cruiser</SelectItem>
                <SelectItem value="Touring">Touring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Auth Buttons or Dropdown */}
          <div className="space-y-4 flex flex-col items-start">
            {/* Updated Cart Link with dark text to show on white background */}
            <Link to="/cart" className="flex justify-start items-center text-gray-800">
              <ShoppingCart className="h-6 w-8" />
              Cart ({cartItems.length})
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-white text-gray-800 w-full px-4 rounded-2xl text-left">
                  My Account
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link
                      to={user.role === "admin" ? "/dashboard-admin" : "/dashboard-user"}
                      className="w-full"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button className="text-gray-800 rounded-2xl" onClick={() => navigate("/login")}>
                Log In
              </button>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center w-2/4 justify-center">
          <Link to="/products" className="text-gray-800">
            Products
          </Link>
          <Link to="/about" className="text-gray-800">
            About
          </Link>
          <Link to="/contact" className="text-gray-800">
            Contact
          </Link>
          <div className="flex justify-center items-center w-60 bg-white text-gray-800 rounded-xl">
            <Select onValueChange={(value) => handleFilterChange("all", value)}>
              <SelectTrigger className="w-60 rounded-xl">
                Select an Option
              </SelectTrigger>
              <SelectContent>
                <div className="px-4 py-2 text-gray-500 font-semibold">Categories</div>
                <SelectItem value="Superbike">Superbike</SelectItem>
                <SelectItem value="Adventure">Adventure</SelectItem>
                <SelectItem value="Commuter">Commuter</SelectItem>

                <div className="px-4 py-2 text-gray-500 font-semibold mt-2">Brands</div>
                <SelectItem value="Honda">Honda</SelectItem>
                <SelectItem value="Yamaha">Yamaha</SelectItem>
                <SelectItem value="Kawasaki">Kawasaki</SelectItem>

                <div className="px-4 py-2 text-gray-500 font-semibold mt-2">Models</div>
                <SelectItem value="Sport">Sport</SelectItem>
                <SelectItem value="Cruiser">Cruiser</SelectItem>
                <SelectItem value="Touring">Touring</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Auth Buttons or Dropdown */}
        <div className="hidden md:flex space-x-4 items-center w-1/4 justify-end">
          {/* Updated Cart Link with dark text */}
          <Link to="/cart" className="relative flex items-center text-gray-800">
            <ShoppingCart className="h-6 w-8" />
            Cart ({cartItems.length})
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-white text-gray-800 text-base py-2 px-4 rounded-2xl">
                My Account
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to={user.role === "admin" ? "/dashboard-admin" : "/dashboard-user"} className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              className="text-gray-800 text-base py-2 px-4 rounded-2xl"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

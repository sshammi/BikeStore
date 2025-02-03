import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { FaBicycle } from 'react-icons/fa';
import { FiMenu, FiX } from "react-icons/fi";// Using lucide-react for the cart icon

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Access auth state from Redux store
  const { user } = useSelector((state: RootState) => state.auth);

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
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4 fixed w-full z-50 top-0 shadow-lg">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <FaBicycle className="text-white h-10 w-10" /> {/* Bike icon with white color */}
        <Link to="/" className="text-xl font-bold text-white">
          BikeStore
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu Links */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white p-4 space-y-4 ${isMobileMenuOpen ? "block" : "hidden"
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
        {/* Authentication Buttons */}
        <div className="space-y-4 text-center">
          {user ? (
            <>
              <Button className="w-full bg-white text-gray-800" variant="outline" onClick={handleDashboard}>
                {user.role === "admin" ? "Admin Dashboard" : "Customer Dashboard"}
              </Button>
              <Button className="w-full bg-white text-gray-800" variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className="w-full bg-white text-gray-800" variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button className="w-full bg-white text-gray-800" variant="outline" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="hidden md:flex space-x-4">
        {user ? (
          <>
            <Button
              className="bg-white text-gray-800 text-base py-2 px-4"
              variant="outline"
              onClick={handleDashboard}
            >
              {user.role === 'admin' ? 'Admin Dashboard' : 'Customer Dashboard'}
            </Button>
            <Button
              className="bg-white text-gray-800 text-base py-2 px-4"
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              className="bg-white text-gray-800 text-base py-2 px-4"
              variant="outline"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              className="bg-white text-gray-800 text-base py-2 px-4"
              variant="outline"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

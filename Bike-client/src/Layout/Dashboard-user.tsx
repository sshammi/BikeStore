import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/auth/authSlice';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Home, User, ShoppingBag, LogOut } from 'lucide-react';

const CustomerDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    return <Navigate to="/" replace={true} />;
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Navbar */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-[#39291C] text-white p-4 z-50 flex items-center">
        <button className="bg-[#39291C] text-white p-2 rounded" onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={24} />
        </button>
        <span className="text-xl font-bold ml-4">Customer Dashboard</span>
      </div>

      {/* Sidebar (Small Screens) */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-[#39291C] text-white p-4 z-40 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:hidden`}
      >
        <ul className="space-y-3 mt-16" onClick={() => setIsOpen(false)}>
          <SidebarItem icon={<Home size={20} />} text="Home" to="/" />
          <SidebarItem icon={<User size={20} />} text="Profile" to="/dashboard-user/profile" />
          <SidebarItem icon={<ShoppingBag size={20} />} text="My Orders" to="/dashboard-user/orders" />
        </ul>
        <button
          onClick={handleLogout}
          className="w-full p-2 mt-12 bg-white text-[#39291C] rounded flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Sidebar (Large Screens) */}
      <div className="hidden sm:block w-64 h-screen bg-[#39291C] text-white p-4 fixed top-0 left-0 z-40">
        <h2 className="text-xl font-bold mb-6">Customer Dashboard</h2>
        <ul className="space-y-3">
          <SidebarItem icon={<Home size={20} />} text="Home" to="/" />
          <SidebarItem icon={<User size={20} />} text="Profile" to="/dashboard-user/profile" />
          <SidebarItem icon={<ShoppingBag size={20} />} text="My Orders" to="/dashboard-user/orders" />
        </ul>
        <button
          onClick={handleLogout}
          className="w-full p-2 mt-96 bg-white text-[#39291C] rounded-xl flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 sm:ml-64 p-4">
        <Outlet />
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, text, to }) => (
  <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center gap-3">
    {icon}
    <Link to={to}>{text}</Link>
  </li>
);

export default CustomerDashboard;

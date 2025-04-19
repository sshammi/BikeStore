import { logout } from '@/redux/features/auth/authSlice';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Home, Users, Package, ShoppingCart, Star, Zap, LogOut, MessageCircle } from 'lucide-react';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    return <Navigate to="/" replace={true} />;
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Navbar */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-50 flex items-center">
        <button className="bg-gray-800 text-white p-2 rounded" onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={24} />
        </button>
        <span className="text-xl font-bold ml-4">Admin Dashboard</span>
      </div>

      {/* Sidebar (Small Screens) */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white p-4 z-40 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:hidden`}
      >
        <ul className="space-y-3 mt-16" onClick={() => setIsOpen(false)}>
        <SidebarItem icon={<Home size={20} />} text="Home" to="/" />
          <SidebarItem icon={<Users size={20} />} text="Users" to="/dashboard-admin/users" />
          <SidebarItem icon={<Package size={20} />} text="Products" to="/dashboard-admin/products" />
          <SidebarItem icon={<Star size={20} />} text="Hero Product" to="/dashboard-admin/hero" />
          <SidebarItem icon={<Zap size={20} />} text="Flash Product" to="/dashboard-admin/flash" />
          <SidebarItem icon={<Zap size={20} />} text="Trending Product" to="/dashboard-admin/trending" />
          <SidebarItem icon={<Zap size={20} />} text="Popular Product" to="/dashboard-admin/popular" />
          <SidebarItem icon={<Zap size={20} />} text="Electric Bike" to="/dashboard-admin/electric" />
          <SidebarItem icon={<Zap size={20} />} text="UpComming Product" to="/dashboard-admin/upcomming" />
          <SidebarItem icon={<ShoppingCart size={20} />} text="Orders" to="/dashboard-admin/orders" />
          <SidebarItem icon={< MessageCircle size={20} />} text="Messages" to="/dashboard-admin/msg" />
        </ul>
        <button onClick={handleLogout} className="w-full p-2 mt-6 bg-white text-gray-800 rounded flex items-center justify-center gap-2">
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Sidebar (Large Screens) */}
      <div className="hidden sm:block w-64 h-screen bg-gray-800 text-white p-4 fixed top-0 left-0 z-40">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-3">
          <SidebarItem icon={<Home size={20} />} text="Home" to="/" />
          <SidebarItem icon={<Users size={20} />} text="Users" to="/dashboard-admin/users" />
          <SidebarItem icon={<Package size={20} />} text="Products" to="/dashboard-admin/products" />
          <SidebarItem icon={<Star size={20} />} text="Hero Product" to="/dashboard-admin/hero" />
          <SidebarItem icon={<Zap size={20} />} text="Flash Product" to="/dashboard-admin/flash" />
          <SidebarItem icon={<Zap size={20} />} text="Trending Product" to="/dashboard-admin/trending" />
          <SidebarItem icon={<Zap size={20} />} text="Popular Product" to="/dashboard-admin/popular" />
          <SidebarItem icon={<Zap size={20} />} text="Electric Bike" to="/dashboard-admin/electric" />
          <SidebarItem icon={<Zap size={20} />} text="UpComming Product" to="/dashboard-admin/upcomming" />
          <SidebarItem icon={<ShoppingCart size={20} />} text="Orders" to="/dashboard-admin/orders" />
          <SidebarItem icon={< MessageCircle size={20} />} text="Messages" to="/dashboard-admin/msg" />
        </ul>
        <button onClick={handleLogout} className="w-full p-2 mt-6 bg-white text-gray-800 flex items-center justify-center gap-2 rounded-2xl">
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

export default Dashboard;

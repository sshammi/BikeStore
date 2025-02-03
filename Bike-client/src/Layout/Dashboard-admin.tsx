import { logout } from '@/redux/features/auth/authSlice';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link, Navigate, Outlet } from 'react-router';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    return <Navigate to="/" replace={true} />;
  };
  return (
    <div className="flex min-h-screen">
      {/* Mobile Navbar (ONLY for small devices) */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-50 flex items-center">
        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiMenu size={24} />
        </button>
        <span className="text-xl font-bold ml-4">Admin Dashboard</span>
      </div>

      {/* Sidebar for Small Screens (Hidden by Default) */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white p-4 z-40 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:hidden`}
      >
        <ul className="space-y-2 mt-16" onClick={() => setIsOpen(false)}>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            <Link to="/dashboard-admin/users">Users</Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            <Link to="/dashboard-admin/products">Products</Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            <Link to="/dashboard-admin/orders">Orders</Link>
          </li>
        </ul>
      </div>

      {/* Sidebar for Medium & Large Devices (Always Visible) */}
      <div className="hidden sm:block w-64 h-screen bg-gray-800 text-white p-4 fixed top-0 left-0 z-40">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            <Link to="/dashboard-admin/users">Users</Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            <Link to="/dashboard-admin/products">Products</Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            <Link to="/dashboard-admin/orders">Orders</Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="w-full p-2 mt-12 bg-white text-gray-800 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 sm:ml-64 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

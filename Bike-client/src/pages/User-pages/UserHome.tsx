import { Skeleton } from '@/components/ui/skeleton';
import { useGetMyOrderQuery } from '@/redux/features/auth/authApi';
import { AlertCircle, ShoppingBag, DollarSign } from 'lucide-react';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const UserHome = () => {
    const { data: orderResponse, isLoading, isError } = useGetMyOrderQuery({});
    const orders = orderResponse?.data || [];

    // Calculate total orders and total price spent
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.price) * parseInt(order.quantity), 0);

    // Prepare data for the graph
    const chartData = orders.map(order => ({
        name: order.productName,
        quantity: parseInt(order.quantity),
    }));

    if (isLoading) {
        return <Skeleton className="w-full h-40 rounded-md" />;
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <AlertCircle className="text-red-500" size={48} />
                <p className="text-lg text-red-600 ml-2">Failed to load orders</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <StatCard 
                    icon={<ShoppingBag size={24} />} 
                    title="Total Orders" 
                    value={totalOrders} 
                    color="bg-blue-500"
                />
                <StatCard 
                    icon={<DollarSign size={24} />} 
                    title="Total Spent" 
                    value={`$${totalSpent.toFixed(2)}`} 
                    color="bg-green-500"
                />
            </div>

            {/* Graph Section */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Order Quantity per Product</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="quantity" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
    <div className={`flex items-center p-4 rounded-lg text-white ${color} shadow-md`}>
        <div className="p-3 bg-white text-black rounded-full mr-4">
            {icon}
        </div>
        <div>
            <h3 className="text-lg">{title}</h3>
            <p className="text-xl font-semibold">{value}</p>
        </div>
    </div>
);

export default UserHome;


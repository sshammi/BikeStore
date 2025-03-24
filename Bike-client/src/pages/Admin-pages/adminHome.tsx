
import { useGetAllBikesQuery, useGetAllOrdersQuery, useGetAllUsersQuery } from "@/redux/features/auth/authApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Bike, Users, ShoppingCart, DollarSign, Package } from "lucide-react";

const AdminHome = () => {
  // Fetch data from Redux API
  const { data: bikesResponse } = useGetAllBikesQuery([]);
  const bikes = bikesResponse?.data || [];

  const { data: usersResponse } = useGetAllUsersQuery({});
  const users = usersResponse?.data || [];

  const { data: ordersResponse } = useGetAllOrdersQuery([]);
  const orders = ordersResponse?.data || [];

  // Calculate Total Revenue & Orders
  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.price || "0"), 0);
  const totalProductsSold = orders.reduce((sum, order) => sum + parseInt(order.quantity || "0"), 0);
  const avgOrderValue = orders.length ? (totalRevenue / orders.length).toFixed(2) : 0;

  // Chart Data
  const barChartData = [
    { name: "Bikes", value: bikes.length, color: "#6366F1" },
    { name: "Users", value: users.length, color: "#10B981" },
    { name: "Orders", value: orders.length, color: "#F59E0B" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bikes Card */}
        <Card className="p-4 shadow-lg border border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-blue-600">Total Bikes</CardTitle>
            <Bike className="w-8 h-8 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{bikes.length}</p>
            <p className="text-sm text-gray-500">Available for Rent</p>
          </CardContent>
        </Card>

        {/* Users Card */}
        <Card className="p-4 shadow-lg border border-green-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-green-600">Total Users</CardTitle>
            <Users className="w-8 h-8 text-green-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{users.length}</p>
            <p className="text-sm text-gray-500">Registered Members</p>
          </CardContent>
        </Card>

        {/* Orders Card */}
        <Card className="p-4 shadow-lg border border-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-yellow-600">Total Orders</CardTitle>
            <ShoppingCart className="w-8 h-8 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{orders.length}</p>
            <p className="text-sm text-gray-500">Completed Rentals</p>
          </CardContent>
        </Card>

        {/* Revenue Card */}
        <Card className="p-4 shadow-lg border border-purple-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-purple-600">Total Revenue</CardTitle>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">${totalRevenue}</p>
            <p className="text-sm text-gray-500">Total Earnings</p>
          </CardContent>
        </Card>

        {/* Products Sold Card */}
        <Card className="p-4 shadow-lg border border-red-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-red-600">Total Products Sold</CardTitle>
            <Package className="w-8 h-8 text-red-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{totalProductsSold}</p>
            <p className="text-sm text-gray-500">Units Sold</p>
          </CardContent>
        </Card>

        {/* Average Order Value */}
        <Card className="p-4 shadow-lg border border-gray-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-600">Avg Order Value</CardTitle>
            <DollarSign className="w-8 h-8 text-gray-600" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-gray-600">${avgOrderValue}</p>
            <p className="text-sm text-gray-500">Per Order</p>
          </CardContent>
        </Card>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="p-4 shadow-lg border border-gray-300">
          <CardHeader>
            <CardTitle className="text-gray-800">Data Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                  {barChartData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="p-4 shadow-lg border border-gray-300">
          <CardHeader>
            <CardTitle className="text-gray-800">Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="80%" height={180}>
              <PieChart>
                <Pie data={barChartData} dataKey="value" outerRadius={70} label>
                  {barChartData.map((entry, index) => (
                    <Cell key={`pie-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;

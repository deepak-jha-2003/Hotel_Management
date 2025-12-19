import React from "react";
import { useSelector } from "react-redux";
import {
  FaBed,
  FaBook,
  FaDollarSign,
  FaComment,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-soft-white p-6 rounded-xl shadow-lg flex items-center space-x-4`}
  >
    <div className={`p-3 rounded-full ${color} text-white`}>{icon}</div>
    <div>
      <p className="text-sm font-body text-gray-500">{title}</p>
      <p className="text-2xl font-heading text-deep-brown">{value}</p>
    </div>
  </motion.div>
);

const DashboardPage = () => {
  const { allRooms } = useSelector((state) => state.rooms);
  
  const { bookings } = useSelector((state) => state.bookings);

  const totalRevenue = bookings.reduce((acc, b) => acc + b.totalPrice, 0);

  const revenueData = bookings.map((b) => ({
    name: b.roomName.split(" ")[0],
    revenue: b.totalPrice,
  }));

  const roomTypeData = allRooms.reduce((acc, room) => {
    const type = room.type;
    if (!acc[type]) {
      acc[type] = { name: type, value: 0 };
    }
    acc[type].value += 1;
    return acc;
  }, {});
  
  const pieData = Object.values(roomTypeData);
  const PIE_COLORS = ["#C5A25A", "#3E2C20", "#F7F2E7", "#A9A9A9"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-heading text-deep-brown mb-6">Dashboard</h1>
      
      {/* --- RESPONSIVE GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={<FaDollarSign />}
          color="bg-green-500"
        />
        <StatCard
          title="Total Bookings"
          value={bookings.length}
          icon={<FaBook />}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Rooms"
          value={allRooms.length}
          icon={<FaBed />}
          color="bg-gold"
        />
        <StatCard
          title="Feedback"
          value={12} 
          icon={<FaComment />}
          color="bg-purple-500"
        />
      </div>

      {/* --- RESPONSIVE GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-soft-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-heading text-deep-brown mb-4">
            Revenue by Booking
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#C5A25A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-soft-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-heading text-deep-brown mb-4">
            Room Types
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};


export default DashboardPage;
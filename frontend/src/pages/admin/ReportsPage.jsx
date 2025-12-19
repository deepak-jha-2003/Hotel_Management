import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const PIE_COLORS = ["#C5A25A", "#3E2C20", "#F7F2E7", "#A9A9A9", "#8b5e34"];

const ReportsPage = () => {
const { bookings } = useSelector((state) => state.bookings);
  const { allRooms } = useSelector((state) => state.rooms);

  // Memoized data processing
  const { monthlyRevenue, bookingsByType } = useMemo(() => {
    const revenueData = {};
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    monthNames.forEach(month => {
      revenueData[month] = { name: month, Revenue: 0 };
    });

    bookings.forEach((b) => {
      const monthIndex = new Date(b.checkIn).getMonth();
      const monthName = monthNames[monthIndex];
      revenueData[monthName].Revenue += b.totalPrice;
    });

    // 2. Process Bookings by Room Type
    const typeData = {};
    bookings.forEach((b) => {
      const room = allRooms.find(r => r.id === b.roomId);
      if (room) {
        typeData[room.type] = (typeData[room.type] || 0) + 1;
      }
    });

    const pieData = Object.keys(typeData).map(key => ({
      name: key,
      value: typeData[key]
    }));

    return { monthlyRevenue: Object.values(revenueData), bookingsByType: pieData };
  }, [bookings, allRooms]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-heading text-deep-brown">Reports</h1>

      {/* Monthly Revenue Chart */}
      <div className="bg-soft-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-heading text-deep-brown mb-4">
          Monthly Revenue (2025)
        </h3>
        {bookings.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Revenue"
                stroke="#C5A25A"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="font-body text-gray-500">No booking data available.</p>
        )}
      </div>

      {/* Bookings by Type Chart */}
      <div className="bg-soft-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-heading text-deep-brown mb-4">
          Bookings by Room Type
        </h3>
        {bookings.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={bookingsByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {bookingsByType.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(val) => `${val} bookings`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="font-body text-gray-500">No booking data available.</p>
        )}
      </div>
    </motion.div>
  );
};


export default ReportsPage;
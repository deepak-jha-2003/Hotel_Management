import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookings, updateBookingStatus } from "../../features/bookingSlice";
import { motion } from "framer-motion";

const ManageBookingsPage = () => {
  const { bookings, status, error } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();

  // Load bookings initially
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  // --- BUTTON FUNCTIONING ---
  const handleStatusChange = async (id, newStatus) => {
    await dispatch(updateBookingStatus({ id, status: newStatus }));
    
    dispatch(fetchBookings());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-heading text-deep-brown mb-6">
        Manage Bookings
      </h1>

      {status === "failed" && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="bg-soft-white p-6 rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full min-w-max font-body">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-3">Guest</th>
              <th className="text-left p-3">Room</th>
              <th className="text-left p-3">Dates</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3">
                    <p className="font-bold">{booking.guestName}</p>
                    <p className="text-xs text-gray-500">{booking.email}</p>
                  </td>
                  <td className="p-3">{booking.roomName}</td>
                  <td className="p-3 text-sm">
                    {booking.checkIn} <br/> to {booking.checkOut}
                  </td>
                  <td className="p-3">₹{booking.totalPrice}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        booking.status === "Approved" ? "bg-green-100 text-green-800" :
                        booking.status === "Cancelled" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    {/* CANCEL BUTTON */}
                    {booking.status !== "Cancelled" && (
                      <button
                        onClick={() => handleStatusChange(booking.id, "Cancelled")}
                        className="text-xs bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    
                    {/* APPROVE BUTTON */}
                    {booking.status !== "Approved" && (
                      <button
                        onClick={() => handleStatusChange(booking.id, "Approved")}
                        className="text-xs bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};


export default ManageBookingsPage;
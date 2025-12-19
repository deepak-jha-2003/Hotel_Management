import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa"; // Imported Icons

const BookingHistoryCard = ({ booking }) => {
  const { roomName, roomImage, checkIn, checkOut, totalPrice, status, roomId } = booking;

  // --- HELPER: Status Design --
  const getStatusContent = () => {
    switch (status) {
      case "Approved":
        return {
          color: "bg-green-50 border-green-200 text-green-700",
          icon: <FaCheckCircle className="text-xl" />,
          message: "Booking Confirmed!",
          subMessage: "We are ready to welcome you.",
        };
      case "Cancelled":
        return {
          color: "bg-red-50 border-red-200 text-red-700",
          icon: <FaTimesCircle className="text-xl" />,
          message: "Booking Cancelled",
          subMessage: "Contact support for details.",
        };
      default:
        return {
          color: "bg-yellow-50 border-yellow-200 text-yellow-700",
          icon: <FaClock className="text-xl" />,
          message: "Pending Approval",
          subMessage: "Waiting for admin confirmation.",
        };
    }
  };

  const statusConfig = getStatusContent();

  return (
    <div className="bg-soft-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-beige hover:shadow-2xl transition-shadow duration-300">
      
      {/* Image Section */}
      <div className="w-full md:w-1/3 relative">
        <img
          src={roomImage}
          alt={roomName}
          className="w-full h-48 md:h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=Room+Image";
          }}
        />
        {/* Status Badge on Image (Mobile Only) */}
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold md:hidden ${statusConfig.color}`}>
          {status}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-heading text-deep-brown font-bold">{roomName}</h3>
          
          {/* Price Tag */}
          <span className="text-xl font-heading text-gold font-semibold">
            ₹{totalPrice}
          </span>
        </div>

        {/* ---  CONFIRMATION MESSAGE BOX --- */}
        <div className={`flex items-center p-3 rounded-lg border mb-4 ${statusConfig.color}`}>
            <div className="mr-3">{statusConfig.icon}</div>
            <div>
                <h4 className="font-bold text-sm font-heading">{statusConfig.message}</h4>
                <p className="text-xs font-body opacity-80">{statusConfig.subMessage}</p>
            </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mb-6 font-body text-sm text-gray-600">
          <div className="flex items-center">
            <FaCalendarAlt className="text-gold mr-2" />
            <div>
              <p className="text-xs text-gray-400 uppercase">Check-in</p>
              <p className="font-semibold text-deep-brown">{checkIn}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-gold mr-2" />
            <div>
              <p className="text-xs text-gray-400 uppercase">Check-out</p>
              <p className="font-semibold text-deep-brown">{checkOut}</p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-beige flex justify-end">
          <Link
            to={`/rooms/${roomId}`}
            className="text-sm font-bold text-deep-brown hover:text-gold transition-colors flex items-center"
          >
            View Room Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryCard;
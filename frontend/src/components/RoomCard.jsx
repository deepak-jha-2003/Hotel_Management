/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaBan } from "react-icons/fa";

const RoomCard = ({ room }) => {
  if (!room) return null;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const isSoldOut = room.isAvailable === false;


  const imageList = Array.isArray(room.images) ? room.images : [];
  const imageUrl = imageList.length > 0 
    ? imageList[0] 
    : "https://via.placeholder.com/800x600?text=No+Image";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={!isSoldOut ? { scale: 1.03 } : {}}
      layout
      className={`bg-soft-white rounded-xl shadow-lg overflow-hidden flex flex-col relative transition-all duration-300 ${
        isSoldOut ? "opacity-75 grayscale bg-gray-100" : ""
      }`}
    >
      {/* Availability Badge */}
      {isSoldOut && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center shadow-md">
          <FaBan className="mr-1" /> Sold Out
        </div>
      )}

      {/* Room Image */}
      <div className="relative">
        <img
          src={imageUrl} 
          alt={room.name || "Room"}
          className="w-full h-56 object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x600?text=Image+Error";
          }}
        />
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-heading text-deep-brown font-bold leading-tight">
            {room.name || "Unnamed Room"}
          </h3>
          
          {/* Real-Time Rating Badge */}
          <div className="flex items-center bg-beige px-2 py-1 rounded-lg shrink-0 ml-2">
            <FaStar className="text-gold text-sm mr-1" />
            <span className="text-deep-brown font-bold text-sm">
              {room.rating ? room.rating : "New"}
            </span>
            {room.ratingCount > 0 && (
              <span className="text-xs text-gray-500 ml-1">
                ({room.ratingCount})
              </span>
            )}
          </div>
        </div>

        <p className="font-body text-gray-600 text-sm mb-4 line-clamp-3">
          {room.description || "No description available."}
        </p>

        <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-2xl font-heading text-gold font-bold">
            ₹{room.price || 0}
            <span className="text-sm font-body text-gray-500 font-normal ml-1">
              /night
            </span>
          </span>

          {/* Conditional Button Logic */}
          {!isSoldOut ? (
            <Link
              to={`/rooms/${room.id}`}
              className="py-2 px-6 rounded-full font-body font-semibold transition-all duration-300 bg-gold text-soft-white hover:bg-deep-brown shadow-md hover:shadow-lg text-sm"
            >
              Details
            </Link>
          ) : (
            <button
              disabled
              className="py-2 px-6 rounded-full font-body font-semibold bg-gray-300 text-gray-500 cursor-not-allowed text-sm"
            >
              Unavailable
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};


export default RoomCard;
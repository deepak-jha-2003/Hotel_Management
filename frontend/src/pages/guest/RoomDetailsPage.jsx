import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";
import { FaChevronLeft, FaChevronRight, FaSpinner } from "react-icons/fa";

const RoomDetailsPage = () => {
  const { id } = useParams();
  
  // 1. Get status along with the rooms
  const { allRooms, status } = useSelector((state) => state.rooms);
  
  const room = allRooms.find((r) => r.id === id);
  const [currentImage, setCurrentImage] = useState(0);

  // 2. SHOW LOADING SPINNER while fetching data
  if (status === "loading" || status === "idle") {
    return (
      <div className="flex justify-center items-center h-screen bg-beige">
        <FaSpinner className="animate-spin text-4xl text-gold" />
        <span className="ml-4 font-heading text-xl text-deep-brown">Loading Room Details...</span>
      </div>
    );
  }

  // 3. Show "Not Found" only if loading is FINISHED and room is still missing
  if (!room) {
    return (
      <div className="text-center py-20 font-heading text-2xl text-deep-brown">
        <p className="mb-4">Room not found.</p>
        <Button to="/rooms">Back to Rooms</Button>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentImage(currentImage === room.images.length - 1 ? 0 : currentImage + 1);
  };

  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? room.images.length - 1 : currentImage - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="bg-soft-white rounded-xl shadow-2xl overflow-hidden p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Image Carousel */}
          <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={room.images[currentImage]}
                alt={room.name}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x600?text=Image+Unavailable";
                }}
              />
            </AnimatePresence>
            
            {/* Arrows only if more than 1 image */}
            {room.images.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-soft-white/50 p-2 rounded-full text-deep-brown opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-soft-white/50 p-2 rounded-full text-deep-brown opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaChevronRight />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {room.images.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                        index === currentImage ? "bg-gold scale-125" : "bg-soft-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Room Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-heading text-deep-brown mb-4">
              {room.name}
            </h1>
            <p className="font-body text-gray-700 text-lg mb-6">
              {room.description}
            </p>
            <div className="mb-6">
              <h3 className="text-2xl font-heading text-deep-brown mb-3">
                Amenities
              </h3>
              <ul className="grid grid-cols-2 gap-2 font-body text-gray-600">
                {/* Ensure amenities exist before mapping */}
                {room.amenities && room.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center">
                    <span className="text-gold mr-2">✓</span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-6">
                <span className="text-4xl font-heading text-gold">
                  ₹{room.price}
                  <span className="text-lg font-body text-gray-500">
                    /night
                  </span>
                </span>
              </div>
              <Button to={`/book/${room.id}`} className="w-full text-center">
                Book This Room
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomDetailsPage;
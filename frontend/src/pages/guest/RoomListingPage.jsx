/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterRooms, fetchRooms } from "../../features/roomSlice";
import RoomCard from "../../components/RoomCard";
import { motion, AnimatePresence } from "framer-motion";

const RoomListingPage = () => {
  const dispatch = useDispatch();

  // 1. Get 'allRooms' to detect data changes, and 'filteredRooms' for display
  const { filteredRooms, allRooms } = useSelector((state) => state.rooms);

  // 2. Initial State with Price Limit set to 20,000
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    price: 20000, // <--- DEFAULT FILTER VALUE (Matches slider max)
    amenities: [],
  });

  const allAmenities = ["Wi-Fi", "Pool", "AC", "Breakfast", "Parking"];

  // --- 3. POLLING (Auto-Update Rooms every 5 seconds) ---
  useEffect(() => {
    // Initial fetch
    dispatch(fetchRooms());

    const intervalId = setInterval(() => {
      dispatch(fetchRooms());
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  // --- 4. APPLY FILTERS (Run when Filters OR Data changes) ---
  useEffect(() => {
    dispatch(filterRooms(filters));
  }, [filters, allRooms, dispatch]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-heading text-center text-deep-brown mb-12">
        Explore Our Rooms
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* --- Filters Sidebar --- */}
        <aside className="w-full md:w-1/4 p-6 bg-soft-white rounded-xl shadow-lg h-fit">
          <h3 className="text-xl font-heading text-deep-brown mb-4">
            Filter Rooms
          </h3>

          {/* Search */}
          <div className="mb-4">
            <label className="block text-sm font-body font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name..."
              className="w-full p-2 border border-beige rounded-lg focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          {/* Price Slider */}
          <div className="mb-4">
            <label className="block text-sm font-body font-medium text-gray-700 mb-1">
              Max Price: <span className="font-bold text-gold">₹{filters.price}</span>
            </label>
            <input
              type="range"
              name="price"
              min="100"
              max="20000" // <--- SLIDER LIMIT set to 20,000
              value={filters.price}
              onChange={handleFilterChange}
              className="w-full h-2 bg-beige rounded-lg appearance-none cursor-pointer accent-gold"
            />
          </div>

          {/* Room Type */}
          <div className="mb-4">
            <label className="block text-sm font-body font-medium text-gray-700 mb-1">
              Room Type
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-2 border border-beige rounded-lg focus:outline-none focus:ring-1 focus:ring-gold bg-white"
            >
              <option value="">All</option>
              <option value="Single">Single</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Family">Family</option>
            </select>
          </div>

          {/* Amenities Checkboxes */}
          <div>
            <label className="block text-sm font-body font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="space-y-2">
              {allAmenities.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    checked={filters.amenities.includes(amenity)}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold"
                  />
                  <label className="ml-2 text-sm font-body text-gray-600">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* --- Room Grid --- */}
        <main className="w-full md:w-3/4">
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {filteredRooms && filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full flex flex-col items-center justify-center py-10"
                >
                   <p className="text-gray-500 font-body text-lg">
                      No rooms found matching your filters.
                   </p>
                   {/* Helper hint for debugging */}
                   <p className="text-sm text-gray-400 mt-2">
                      (Check if your rooms are priced above ₹20,000)
                   </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default RoomListingPage;
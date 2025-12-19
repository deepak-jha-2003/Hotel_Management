import React, { useMemo } from "react"; // 1. Import useMemo
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import { FaWifi, FaSwimmingPool, FaConciergeBell, FaSpa } from "react-icons/fa";
import { useSelector } from "react-redux";
import RoomCard from "../../components/RoomCard";
import HeroSearchBar from "../../components/HeroSearchBar";

// Example Testimonial component
const TestimonialCard = ({ quote, author }) => (
  <div className="bg-beige/80 p-6 rounded-xl shadow-lg backdrop-blur-xs">
    <p className="font-body text-deep-brown mb-4 italic">"{quote}"</p>
    <h4 className="font-heading text-gold font-semibold">- {author}</h4>
  </div>
);

const HomePage = () => {
  // --- FIX START ---
  
  // 1. Select the raw array. If 'allRooms' hasn't changed in Redux, 
  // this returns the exact same memory reference.
  const allRooms = useSelector((state) => state.rooms.allRooms);

  // 2. Use useMemo to derive the "top 3".
  // This operation only runs if 'allRooms' reference changes.
  const featuredRooms = useMemo(() => {
    return allRooms ? allRooms.slice(0, 3) : [];
  }, [allRooms]);
  
  // --- FIX END ---

  const amenities = [
    { icon: <FaSwimmingPool size={30} />, name: "Luxury Pool" },
    { icon: <FaSpa size={30} />, name: "World-Class Spa" },
    { icon: <FaConciergeBell size={30} />, name: "24/7 Concierge" },
    { icon: <FaWifi size={30} />, name: "High-Speed Wi-Fi" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fit=crop&w=1600&q=80)",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-soft-white p-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading mb-4"
          >
            Experience Comfort,
          </motion.h1>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-heading text-gold mb-8"
          >
            Luxury & Serenity.
          </motion.h1>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button to="/rooms">Explore Our Rooms</Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 w-full px-4 md:w-auto"
        >
          <HeroSearchBar />
        </motion.div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading text-center text-deep-brown mb-12">
            Our Finest Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-soft-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading text-center text-deep-brown mb-12">
            Unmatched Amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {amenities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-4"
              >
                <div className="text-gold mb-4">{item.icon}</div>
                <h3 className="text-xl font-heading text-deep-brown">
                  {item.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-20"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1596701062351-8c4894e4a7e9?fit=crop&w=1600&q=80)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-deep-brown/60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-heading text-center text-deep-brown mb-12">
            What Our Guests Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="An unforgettable experience. The luxury and service were second to none. We will be back!"
              author="Alice & Bob"
            />
            <TestimonialCard
              quote="The Presidential Suite was breathtaking. Waking up to that view was a dream. 5-star service!"
              author="Michael T."
            />
            <TestimonialCard
              quote="From check-in to check-out, every moment was perfect. The spa is a must-try."
              author="Sarah K."
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
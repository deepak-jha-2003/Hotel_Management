import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import { FaCheckCircle } from "react-icons/fa";

const ConfirmationPage = () => {
  const location = useLocation();
  const { bookingId, name } = location.state || {};

  if (!bookingId) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-heading">Invalid Session</h1>
        <Button onClick={() => navigate("/")} className="mt-4">
          Back Home
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
    >
      <div className="bg-soft-white rounded-xl shadow-2xl p-10">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
        <h1 className="text-4xl font-heading text-deep-brown mb-4">
          Booking Confirmed!
        </h1>
        <p className="font-body text-lg text-gray-700 mb-6">
          Thank you, {name}! Your stay at Serenity is confirmed.
        </p>
        <div className="bg-beige/80 rounded-lg p-4 mb-8">
          <p className="font-body text-gray-700">Your Booking ID is:</p>
          <p className="font-heading text-2xl text-gold">{bookingId}</p>
        </div>
        <p className="font-body text-gray-600 mb-8">
          A confirmation email has been (mock) sent to your address. We look
          forward to welcoming you.
        </p>
        <Button to="/rooms" as={Link}>
          Book Another Stay
        </Button>
      </div>
    </motion.div>
  );
};

export default ConfirmationPage;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../features/bookingSlice";
import Button from "../../components/Button";
import { motion } from "framer-motion";
import { FaSpinner, FaLock } from "react-icons/fa";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 1. GET USER ID FROM REDUX
  const { userId } = useSelector((state) => state.userAuth); 

  const { bookingDetails } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);

  // --- PAYMENT STATE ---
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});

  if (!bookingDetails) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-heading">Invalid Booking Session</h1>
        <Button onClick={() => navigate("/rooms")} className="mt-4">Back to Rooms</Button>
      </div>
    );
  }

  const { roomName, roomImage, checkIn, checkOut, totalPrice, name } = bookingDetails;

  const validateForm = () => {
    const newErrors = {};
    if (!cardName.trim()) newErrors.cardName = "Name on card is required";
    const cleanCardNum = cardNumber.replace(/\s/g, "");
    if (!/^\d{16}$/.test(cleanCardNum)) newErrors.cardNumber = "Card number must be exactly 16 digits";
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry)) newErrors.expiry = "Invalid format (MM/YY)";
    if (!/^\d{3,4}$/.test(cvc)) newErrors.cvc = "Invalid CVC";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    const backendData = {
      userId: userId || null, // 2. SEND USER ID HERE
      roomId: bookingDetails.roomId,
      roomName: bookingDetails.roomName,
      roomImage: bookingDetails.roomImage,
      guestName: bookingDetails.name,
      email: bookingDetails.email,
      phone: bookingDetails.phone,
      address: bookingDetails.address,
      aadhaarNumber: bookingDetails.aadhaar,
      aadhaarFrontImg: bookingDetails.aadhaarFrontImg,
      aadhaarBackImg: bookingDetails.aadhaarBackImg,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      nights: bookingDetails.nights,
      totalPrice: bookingDetails.totalPrice,
    };
    
    dispatch(createBooking(backendData))
      .unwrap()
      .then((data) => {
        setIsLoading(false);
        navigate("/confirmation", {
          state: { bookingId: data.id, name: data.guestName },
        });
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Booking Failed: " + (err.message || err));
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-4xl font-heading text-center text-deep-brown mb-8">
        Complete Your Payment
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Order Summary */}
        <div className="bg-beige/80 rounded-lg p-6 space-y-4 shadow-lg h-fit">
          <h2 className="text-2xl font-heading text-deep-brown mb-4">
            Order Summary
          </h2>
          <img src={roomImage} alt={roomName} className="w-full h-40 object-cover rounded-lg mb-4" />
          <h3 className="text-xl font-heading text-gold">{roomName}</h3>
          <p className="font-body text-deep-brown"><strong>Guest:</strong> {name}</p>
          <p className="font-body text-deep-brown"><strong>Dates:</strong> {checkIn} to {checkOut}</p>
          <hr className="border-gold/30" />
          <p className="flex justify-between text-3xl font-heading">
            <span>Total:</span>
            <span className="text-gold">₹{totalPrice}</span>
          </p>
        </div>

        {/* Payment Form */}
        <div className="bg-soft-white rounded-xl shadow-2xl p-6 md:p-8">
          <h2 className="text-2xl font-heading text-deep-brown mb-6">Pay Securely</h2>
          <div className="space-y-4">
            
            <div>
                <label className="block text-sm font-body font-medium text-gray-700 mb-1">Name on Card</label>
                <input 
                    type="text" 
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Karan Luthra" 
                    className={`w-full p-3 bg-white border ${errors.cardName ? 'border-red-500' : 'border-beige'} rounded-lg`} 
                />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-gray-700 mb-1">Card Number</label>
              <input 
                type="text" 
                maxLength="16"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="0000000000000000" 
                className={`w-full p-3 bg-white border ${errors.cardNumber ? 'border-red-500' : 'border-beige'} rounded-lg`} 
               />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-body font-medium text-gray-700 mb-1">Expiry (MM/YY)</label>
                <input 
                    type="text" 
                    maxLength="5"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="12/28" 
                    className={`w-full p-3 bg-white border ${errors.expiry ? 'border-red-500' : 'border-beige'} rounded-lg`} 
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-body font-medium text-gray-700 mb-1">CVC</label>
                <input 
                    type="password" 
                    maxLength="4"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="123" 
                    className={`w-full p-3 bg-white border ${errors.cvc ? 'border-red-500' : 'border-beige'} rounded-lg`} 
                />
              </div>
            </div>
            
            <p className="text-xs font-body text-gray-500 flex items-center">
              <FaLock className="mr-1" /> Payment details are secured.
            </p>

            <Button onClick={handlePayment} disabled={isLoading} className="w-full flex items-center justify-center">
              {isLoading ? <><FaSpinner className="animate-spin mr-2" /> Processing...</> : `Pay ₹${totalPrice}`}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentPage;
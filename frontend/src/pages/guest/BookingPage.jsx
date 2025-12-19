import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import Button from "../../components/Button";
import { motion } from "framer-motion";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = useSelector((state) =>
    state.rooms.allRooms.find((r) => r.id === id)
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aadhaar: "",
    address: "",
    aadhaarFrontImg: "",
    aadhaarBackImg: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (startDate && endDate && endDate > startDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
      setTotalPrice(diffDays * room.price);
      setError("");
    } else {
      setNights(0);
      setTotalPrice(0);
    }
  }, [startDate, endDate, room.price]);

  // --- Helper to convert file to Base64 ---
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // --- Handle Input Change ---
  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      try {
        const base64 = await convertToBase64(files[0]);
        setFormData((prev) => ({ ...prev, [name]: base64 }));
      } catch (err) {
        console.error("Error converting file", err);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); 

    if (formData.name.trim().length < 3) {
      setError("Name must be at least 3 characters long.");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    const emailRegex = /^.{2,}@/;
    if (!emailRegex.test(formData.email)) {
      setError("Email must have at least 2 characters before the '@' symbol.");
      return;
    }

    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(formData.aadhaar)) {
      setError("Aadhaar number must be exactly 12 digits.");
      return;
    }

    if (formData.address.trim().length < 10) {
      setError("Address must be at least 10 characters long.");
      return;
    }

    if (!formData.aadhaarFrontImg || !formData.aadhaarBackImg) {
      setError("Please upload both Aadhaar images.");
      return;
    }
    if (!startDate || !endDate) {
      setError("Please select check-in and check-out dates.");
      return;
    }
    if (endDate <= startDate) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    if (!agreedToTerms) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }

    const bookingDetails = {
      roomId: room.id,
      roomName: room.name,
      roomImage: room.images[0],
      ...formData,
      checkIn: startDate.toISOString().split("T")[0],
      checkOut: endDate.toISOString().split("T")[0],
      nights,
      totalPrice,
    };

    navigate("/payment", { state: { bookingDetails } });
  };

  if (!room) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-4xl font-heading text-center text-deep-brown mb-8">
        Book Your Stay
      </h1>
      <div className="bg-soft-white rounded-xl shadow-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-heading text-deep-brown">Guest Details</h2>
          
          <div>
            <label className="block text-sm font-body font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 bg-white border border-beige rounded-lg hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" required />
          </div>
          
          <div>
            <label className="block text-sm font-body font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 bg-white border border-beige rounded-lg hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" required />
          </div>
          
          <div>
            <label className="block text-sm font-body font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 bg-white border border-beige rounded-lg hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" required />
          </div>
          
          <div>
            <label className="block text-sm font-body font-medium text-gray-700 mb-1">Full Address</label>
            <textarea name="address" rows="3" value={formData.address} onChange={handleInputChange} className="w-full p-3 bg-white border border-beige rounded-lg hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" required />
          </div>

          <h2 className="text-2xl font-heading text-deep-brown pt-4">Verification</h2>
          <div>
            <label className="block text-sm font-body font-medium text-gray-700 mb-1">Aadhaar Number </label>
            <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleInputChange} className="w-full p-3 bg-white border border-beige rounded-lg hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" required />
          </div>
          
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-sm font-body font-medium text-gray-700 mb-1">Aadhaar Front</label>
              <input type="file" name="aadhaarFrontImg" accept="image/*" onChange={handleInputChange} className="w-full p-3 bg-white border border-beige rounded-lg hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" required />
            </div>
            <div className="w-full">
              <label className="block text-sm font-body font-medium text-gray-700 mb-1">Aadhaar Back</label>
              <input type="file" name="aadhaarBackImg" accept="image/*" onChange={handleInputChange} className="w-full p-3 bg-white border border-beige rounded-lg hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" required />
            </div>
          </div>

          <h2 className="text-2xl font-heading text-deep-brown pt-4">Dates</h2>
          <div className="flex gap-4">
             <div className="w-full">
               <label className="block text-sm text-gray-700 mb-1">Check-in</label>
               <DatePicker selected={startDate} onChange={setStartDate} selectsStart startDate={startDate} endDate={endDate} minDate={new Date()} className="w-full p-3 bg-white border border-beige rounded-lg hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" placeholderText="Select Date" />
             </div>
             <div className="w-full">
               <label className="block text-sm text-gray-700 mb-1">Check-out</label>
               <DatePicker selected={endDate} onChange={setEndDate} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} className="w-full p-3 bg-white border border-beige rounded-lg hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" placeholderText="Select Date" />
             </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center space-x-3">
              <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-5 w-5 text-gold hover:ring-1 hover:ring-gold focus:ring-2 focus:ring-gold focus:outline-none" />
              <span className="font-body text-sm text-gray-700">I agree to Terms & Conditions.</span>
            </label>
          </div>

          {error && <p className="text-red-600 text-sm font-body">{error}</p>}
          <Button type="submit" className="w-full">Proceed to Payment</Button>
        </form>


        {/* Summary */}
        <div className="bg-beige/80 rounded-lg p-6 space-y-4 h-fit">
           <img src={room.images[0]} alt={room.name} className="w-full h-40 object-cover rounded-lg" />
           <h3 className="text-xl font-heading text-gold">{room.name}</h3>
           <p className="flex justify-between font-body"><span>Total Price:</span> <span className="text-gold">₹{totalPrice}</span></p>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingPage;
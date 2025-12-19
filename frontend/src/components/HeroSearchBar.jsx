import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import Button from "./Button";

const HeroSearchBar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState("2");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];

    const query = new URLSearchParams({
      start,
      end,
      guests,
    });

    navigate(`/rooms?${query.toString()}`);
  };

  const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
    <button
      type="button"
      className="hero-datepicker-input" 
      onClick={onClick}
      ref={ref}
    >
      <FaCalendarAlt className="inline-block mr-2 text-gold" />
      {value || placeholder}
    </button>
  ));
  CustomInput.displayName = "CustomInput";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-soft-white/20 backdrop-blur-md rounded-xl p-4 shadow-lg w-full max-w-4xl mt-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-white">
        {/* Check-in */}
        <div className="w-full">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            placeholderText="Check-in Date"
            customInput={<CustomInput placeholder="Check-in Date" />}
            className="w-full"
            popperPlacement="bottom-start"
          />
        </div>

        {/* Check-out */}
        <div className="w-full">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            placeholderText="Check-out Date"
            customInput={<CustomInput placeholder="Check-out Date" />}
            className="w-full"
            popperPlacement="bottom-start"
          />
        </div>

        {/* Guests */}
        <div className="relative">
          <FaUserFriends className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="hero-datepicker-input pl-10" 
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4+ Guests</option>
          </select>
        </div>

        {/* Button */}
        <Button type="submit" className="w-full md:col-span-1">
          Check Availability
        </Button>
      </div>
    </form>
  );
};

export default HeroSearchBar;
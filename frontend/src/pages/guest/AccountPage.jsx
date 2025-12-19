import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import BookingHistoryCard from "../../components/BookingHistoryCard";
import { fetchUserBookings } from "../../features/bookingSlice";
import RatingModal from "../../components/RatingModal"; // Import Modal

const AccountPage = () => {
  const dispatch = useDispatch();
  const { userName, userEmail, userId } = useSelector((state) => state.userAuth);
  const { bookings } = useSelector((state) => state.bookings);

  // State for Rating Modal
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchUserBookings(userEmail));
      const intervalId = setInterval(() => {
        dispatch(fetchUserBookings(userEmail));
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [dispatch, userEmail]);

  const handleOpenRateModal = (roomId) => {
    setSelectedRoomId(roomId);
    setIsRatingOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h1 className="text-4xl font-heading text-center text-deep-brown mb-12">
        My Account
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <aside className="lg:col-span-1">
          <div className="bg-soft-white rounded-xl shadow-lg p-8 sticky top-28">
            <h2 className="text-3xl font-heading text-gold mb-4">My Profile</h2>
            <div className="space-y-3 font-body">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="text-lg text-deep-brown">{userName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="text-lg text-deep-brown">{userEmail}</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl font-heading text-deep-brown">My Bookings</h2>
          {bookings && bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="relative">
                <BookingHistoryCard booking={booking} />
                
                {/* RATING BUTTON LOGIC */}
                {booking.status === "Approved" && (
                    <div className="absolute top-4 right-4 md:top-auto md:bottom-6 md:right-6">
                         <button 
                            onClick={() => handleOpenRateModal(booking.roomId)}
                            className="bg-gold mt-[393px] me-47 h-13 border-2 rounded-xl  text-xs mx-40 px-1 py-1 text-white  lg:flex items-center justify-center text-xs mx-40 px-3 py-2 rounded hover:bg-opacity-90 shadow-md font-bold"
                         >
                            Rate Room
                         </button>
                    </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-soft-white rounded-xl shadow-lg p-8 text-center">
              <p className="font-body text-gray-600">
                You haven't made any bookings yet.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* RATING MODAL */}
      <RatingModal 
        isOpen={isRatingOpen} 
        onClose={() => setIsRatingOpen(false)} 
        roomId={selectedRoomId}
        userId={userId}
      />
    </motion.div>
  );
};

export default AccountPage;
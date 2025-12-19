import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaTimes, FaSearchPlus, FaTrash } from "react-icons/fa"; // Added FaTrash
import Modal from "../../components/Modal"; 
import { deleteBooking } from "../../features/bookingSlice"; // Import Delete Action

const ITEMS_PER_PAGE = 10;

const GuestRecordsPage = () => {
  const dispatch = useDispatch(); // Init Dispatch
  const { bookings } = useSelector((state) => state.bookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullScreenImg, setFullScreenImg] = useState(null);

  // Filter unique guests based on email
  const guests = useMemo(() => {
    const guestMap = new Map();
    bookings.forEach((booking) => {
      if (!guestMap.has(booking.email)) {
        guestMap.set(booking.email, { ...booking });
      }
    });
    return Array.from(guestMap.values());
  }, [bookings]);

  const paginatedGuests = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return guests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [guests, currentPage]);

  const handleViewDetails = (guest) => {
    setSelectedGuest(guest);
    setIsModalOpen(true);
  };

  // --- DELETE FUNCTION ---
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this guest record? This will remove the associated booking.")) {
      dispatch(deleteBooking(id));
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading text-deep-brown mb-6">
          Guest Records
        </h1>
        <div className="bg-soft-white p-6 rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full min-w-[1000px] font-body">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Contact</th>
                <th className="text-left p-3">Aadhaar</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedGuests.map((guest) => (
                <tr key={guest.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-semibold">{guest.guestName}</td>
                  <td className="p-3">
                    <div>{guest.phone}</div>
                    <div className="text-xs text-gray-500">{guest.email}</div>
                  </td>
                  <td className="p-3">{guest.aadhaarNumber}</td>
                  <td className="p-3 flex space-x-3">
                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(guest)}
                      className="flex items-center px-3 py-1 bg-gold text-white rounded hover:bg-opacity-90 text-sm"
                      title="View Details"
                    >
                      <FaEye className="mr-1" /> View
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(guest.id)}
                      className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition-colors"
                      title="Delete Record"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginatedGuests.length === 0 && (
            <p className="text-center text-gray-500 py-4">No records found.</p>
          )}
        </div>
      </motion.div>

      {/* --- GUEST DETAILS MODAL --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Guest Details"
      >
        {selectedGuest && (
          <div className="space-y-4 font-body text-deep-brown">
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Name:</strong> {selectedGuest.guestName}</div>
              <div><strong>Phone:</strong> {selectedGuest.phone}</div>
              <div className="col-span-2"><strong>Email:</strong> {selectedGuest.email}</div>
              <div className="col-span-2"><strong>Address:</strong> {selectedGuest.address}</div>
              <div className="col-span-2"><strong>Aadhaar Number:</strong> {selectedGuest.aadhaarNumber}</div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-heading text-lg mb-2">Documents (Click to Zoom)</h4>
              <div className="grid grid-cols-2 gap-4">
                {/* Front Image */}
                <div 
                  className="bg-gray-100 p-2 rounded text-center text-sm cursor-pointer hover:bg-gray-200 transition group relative"
                  onClick={() => selectedGuest.aadhaarFrontImg && setFullScreenImg(selectedGuest.aadhaarFrontImg)}
                >
                  <p className="mb-2 font-bold text-gray-600">Front Side</p>
                  {selectedGuest.aadhaarFrontImg ? (
                    <>
                        <img src={selectedGuest.aadhaarFrontImg} alt="Aadhaar Front" className="w-full h-32 object-contain border border-gray-300 rounded bg-white"/>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition rounded">
                            <FaSearchPlus className="text-white text-3xl drop-shadow-lg" />
                        </div>
                    </>
                  ) : <span className="text-red-400">Not Uploaded</span>}
                </div>

                {/* Back Image */}
                <div 
                  className="bg-gray-100 p-2 rounded text-center text-sm cursor-pointer hover:bg-gray-200 transition group relative"
                  onClick={() => selectedGuest.aadhaarBackImg && setFullScreenImg(selectedGuest.aadhaarBackImg)}
                >
                  <p className="mb-2 font-bold text-gray-600">Back Side</p>
                  {selectedGuest.aadhaarBackImg ? (
                    <>
                        <img src={selectedGuest.aadhaarBackImg} alt="Aadhaar Back" className="w-full h-32 object-contain border border-gray-300 rounded bg-white"/>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition rounded">
                             <FaSearchPlus className="text-white text-3xl drop-shadow-lg" />
                        </div>
                    </>
                  ) : <span className="text-red-400">Not Uploaded</span>}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* --- FULL SCREEN IMAGE --- */}
      <AnimatePresence>
        {fullScreenImg && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
                onClick={() => setFullScreenImg(null)}
            >
                <button onClick={() => setFullScreenImg(null)} className="absolute top-5 right-5 text-white bg-white/20 hover:bg-red-500 p-3 rounded-full transition-all">
                    <FaTimes size={24} />
                </button>
                <motion.img 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    src={fullScreenImg}
                    alt="Full Screen Document"
                    className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl border-4 border-white"
                    onClick={(e) => e.stopPropagation()}
                />
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default GuestRecordsPage;
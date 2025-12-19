import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../features/bookingSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UserNotifications = () => {
  const { lastUpdate } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lastUpdate) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [lastUpdate, dispatch]);

  if (!lastUpdate) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-24 right-4 z-[100]"
      >
        <div className={`flex items-center p-4 rounded-lg shadow-2xl border ${
          lastUpdate.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="mr-3">
             {lastUpdate.type === 'success' ? <FaCheckCircle className="text-green-500 text-xl"/> : <FaTimesCircle className="text-red-500 text-xl"/>}
          </div>
          <div>
            <h4 className={`font-heading font-bold ${
              lastUpdate.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>Status Update</h4>
            <p className="font-body text-sm text-gray-700">{lastUpdate.message}</p>
          </div>
          <button onClick={() => dispatch(clearNotification())} className="ml-4 text-gray-400 hover:text-gray-600">×</button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};


export default UserNotifications;
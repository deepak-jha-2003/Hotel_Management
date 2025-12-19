import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaChartLine, 
  FaBed, 
  FaBook, 
  FaUsers, 
  FaEnvelope, // Import Envelope Icon
  FaTimes 
} from "react-icons/fa"; 
import { motion, AnimatePresence } from "framer-motion";

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const menuItems = [
    { path: "/admin/dashboard", name: "Dashboard", icon: <FaChartLine /> },
    { path: "/admin/rooms", name: "Manage Rooms", icon: <FaBed /> },
    { path: "/admin/bookings", name: "Bookings", icon: <FaBook /> },
    { path: "/admin/guests", name: "Guests", icon: <FaUsers /> },
    // --- NEW LINK ---
    { path: "/admin/messages", name: "Messages", icon: <FaEnvelope /> }, 
    { path: "/admin/reports", name: "Reports", icon: <FaChartLine /> },
  ];

  const SidebarContent = () => (
    <div className="h-full bg-deep-brown text-beige flex flex-col p-4 w-64">
      <div className="flex justify-between items-center mb-10 mt-4">
        <h2 className="text-2xl font-heading text-gold">Admin Panel</h2>
        {/* Close button for mobile */}
        <button 
          onClick={() => setIsMobileOpen(false)} 
          className="md:hidden text-beige hover:text-gold"
        >
          <FaTimes size={24} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileOpen(false)} // Close sidebar on click (mobile)
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-all duration-300 font-body ${
                isActive
                  ? "bg-gold text-deep-brown font-bold shadow-md"
                  : "hover:bg-white/10 hover:text-gold"
              }`
            }
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10 text-xs text-center opacity-50 font-body">
        &copy; 2025 Serenity Admin
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Always visible) */}
      <div className="hidden md:block h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar (Animated) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 md:hidden flex"
          >
            <SidebarContent />
            {/* Click outside to close */}
            <div 
              className="flex-grow" 
              onClick={() => setIsMobileOpen(false)} 
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
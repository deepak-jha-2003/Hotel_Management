import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import AdminSidebar from "../components/admin/AdminSidebar";
import { FaBars, FaSignOutAlt } from "react-icons/fa";

// IMPORTS FOR POLLING
import usePolling from "../hooks/usePolling";
import { fetchBookings } from "../features/bookingSlice";
import { fetchMessages } from "../features/contactSlice";
import { fetchRooms } from "../features/roomSlice";

const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // --- AUTO-REFRESH DATA FOR ADMIN ---
  usePolling(fetchBookings, 5000, [isAuthenticated]); 
  usePolling(fetchMessages, 10000, [isAuthenticated]);
  usePolling(fetchRooms, 10000, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  //background overlay for mobile
  const Backdrop = () => (
    <div
      className="fixed inset-0 z-40 bg-black/50 md:hidden"
      onClick={() => setIsMobileOpen(false)}
    ></div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isMobileOpen && <Backdrop />}

      <AdminSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 bg-soft-white shadow-md p-4 flex justify-between items-center">
          {/* Hamburger Button (Mobile only) */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="text-deep-brown md:hidden"
          >
            <FaBars size={24} />
          </button>
          
          <div className="flex-1"></div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-500 hover:text-red-700"
            title="Logout"
          >
            <FaSignOutAlt size={20} />
            <span className="font-body hidden md:inline">Logout</span>
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;